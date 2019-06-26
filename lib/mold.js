const convert = require('convert-source-map');
const through = require('through2');

module.exports = {
  transform: makeTransform
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

function makeTransform(fn) {
  const chunks = [];
  let totalLength = 0;

  function transform(chunk, encoding, next) {
    chunks.push(chunk);
    totalLength += chunk.length;
    next();
  }

  function flush (next) {
    const source = Buffer.concat(chunks, totalLength).toString();
    const sourceMolder = new SourceMolder(source);

    fn(sourceMolder, adaptedComment => {
      const adaptedSource = source.replace(sourceMolder.comment, adaptedComment);
      this.push(adaptedSource);
      next();
    });
  }

  return through(transform, flush);
}
