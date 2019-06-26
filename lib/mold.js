const convert = require('convert-source-map');
const through = require('through');

module.exports = {
  transform
};

function extractComment (source) {
  const m = source.match(convert.commentRegex);
  return m ? m.pop() : null;
}

class SourceMolder {
  constructor(source) {
    this.source = source;
    this.comment = extractComment(source);
    if (!this.comment) return undefined;

    this.sourcemap = convert.fromComment(this.comment);
  }

  toJSON(space) { return this.sourcemap.toJSON(space); }

  _map(key, fn) {
    this.sourcemap.setProperty(key, this.sourcemap.getProperty(key).map(fn));
  }

  mapSources(fn) {
    this._map('sources', fn);
  }

  sourceRoot(sourceRoot) {
    this.sourcemap.setProperty('sourceRoot', sourceRoot);
  }
}

function transform(fn) {
  let source = '';

  function write (data) { source += data; }
  function end () {
    const sourceMolder = new SourceMolder(source);

    function queue(adaptedComment) {
      this.queue(source.replace(sourceMolder.comment, adaptedComment));
      this.queue(null);
    }

    if (fn.length === 1) {
      const adaptedComment = fn(sourceMolder);
      queue.bind(this)(adaptedComment);
    } else if (fn.length > 1) {
      fn(sourceMolder, queue.bind(this));
    } else {
      throw new Error('Function passed to transform needs to take 1 or 2 parameters.');
    }
  }

  return through(write, end);
}
