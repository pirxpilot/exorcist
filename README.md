This is a fork of [exorcist] package.
It updates dependencies and fixes [splitting surrogate pairs][split-bug] bug.

# exorcist

<a href="https://www.patreon.com/bePatron?u=8663953"><img alt="become a patron" src="https://c5.patreon.com/external/logo/become_a_patron_button.png" height="35px"></a>

Externalizes the source map found inside a stream to an external `.map` file or stream.

Works with both JavaScript and CSS input streams.

```js
var browserify = require('browserify')
  , path       = require('path')
  , fs         = require('fs')
  , exorcist   = require('exorcist')
  , mapfile    = path.join(__dirname, 'bundle.js.map')

// from a file, to a file, and send source map to its own file
browserify({debug: true})
  .require(require.resolve('./main'), { entry: true })
  .bundle()
  .pipe(exorcist(mapfile))
  .pipe(fs.createWriteStream(path.join(__dirname, 'bundle.js'), 'utf8'))

//  from a stream, to a stream, and send source map to a stream
browserify([readableSourceStream], browserifyOptions)
  .bundle()
  .pipe(exorcist(targetSourceMapStream, '/url/path/to/replace/source/comment/with/bundle.js'))
  .pipe(writableTargetStream)
```

### command line example

```
browserify main.js --debug | exorcist bundle.js.map > bundle.js
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Usage](#usage)
- [Installation](#installation)
- [API](#api)
- [Integration with other tools](#integration-with-other-tools)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

```
exorcist map_file [options]

  Externalizes the source map of the file streamed in.

  The source map is written as JSON to map_file, and the original file is streamed out with its
  sourceMappingURL set to the path of map_file (or to the value of the --url option).

OPTIONS:

              --base -b   Base path for calculating relative source paths.
                          (default: use absolute paths)

              --root -r   Root URL for loading relative source paths.
                          Set as sourceRoot in the source map.
                          (default: '')

               --url -u   Full URL to source map.
                          Set as sourceMappingURL in the output stream.
                          (default: map_file)

  --error-on-missing -e   Abort with error if no map is found in the stream.
                          (default: warn but still pipe through source)

EXAMPLE:

  Bundle main.js with browserify into bundle.js and externalize the map to bundle.js.map.

    browserify main.js --debug | exorcist bundle.js.map > bundle.js
```

## Installation

    npm install exorcist

## API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="exorcist"><span class="type-signature"></span>exorcist<span class="signature">(input, <span class="optional">url</span>, <span class="optional">root</span>, <span class="optional">base</span>, <span class="optional">errorOnMissing</span>)</span><span class="type-signature"> &rarr; {TransformStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Externalizes the source map of the file streamed in.</p>
<p>The source map is written as JSON to <code>file</code>, and the original file is streamed out with its
<code>sourceMappingURL</code> set to the path of <code>file</code> (or to the value of <code>url</code>).</p>
<h4>Events (in addition to stream events)</h4>
<ul>
<li><code>missing-map</code> emitted if no map was found in the stream and errorOnMissing is falsey
(the src is still piped through in this case, but no map file is written)</li>
</ul>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>input</code></td>
<td class="type">
<span class="param-type">String / Object</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>full path to the map file to which to write the extracted source map or a writable stream</p></td>
</tr>
<tr>
<td class="name"><code>url</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>full URL to the map file, set as <code>sourceMappingURL</code> in the streaming output (default: file)</p></td>
</tr>
<tr>
<td class="name"><code>root</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>root URL for loading relative source paths, set as <code>sourceRoot</code> in the source map (default: '')</p></td>
</tr>
<tr>
<td class="name"><code>base</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>base path for calculating relative source paths (default: use absolute paths)</p></td>
</tr>
<tr>
<td class="name"><code>errorOnMissing</code></td>
<td class="type">
<span class="param-type">Boolean</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>when truthy, causes 'error' to be emitted instead of 'missing-map' if no map was found in the stream (default: falsey)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/exorcist/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/exorcist/blob/master/index.js#L33">lineno 33</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>transform stream into which to pipe the code containing the source map</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">TransformStream</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## Integration with other tools

- [using exorcist with gulp](https://github.com/thlorenz/exorcist/wiki/Recipes#gulp)

## License

MIT

[split-bug]: https://github.com/thlorenz/mold-source-map/pull/9
[exorcist]: https://www.npmjs.com/package/exorcist
