#!/usr/bin/env node
const minimist = require('minimist');
const fs       = require('fs');
const path     = require('path');
const exorcist = require('../');

function onerror(err) {
  console.error(err.toString());
  process.exit(err.errno || 1);
}

function usage() {
  const usageFile = path.join(__dirname, 'usage.txt');
  fs.createReadStream(usageFile).pipe(process.stdout);
  return;
}

(function damnYouEsprima() {
  const argv = minimist(process.argv.slice(2), {
    boolean: [ 'h', 'e' ],
    string: [ 'u', 'r', 'b' ],
    alias: {
      u: 'url',
      b: 'base',
      e: 'error-on-missing',
      r: 'root',
      h: 'help'
    }
  });

  if (argv.help) return usage();


  let mapfile = argv._.shift();
  if (!mapfile) {
    console.error('Missing map file');
    return usage();
  }

  const {
    url,
    root,
    base,
    'error-on-missing': errorOnMissing
  } = argv;

  mapfile = path.resolve(mapfile);

  process.stdin
    .pipe(exorcist(mapfile, url, root, base, errorOnMissing))
    .on('error', onerror)
    .on('missing-map', console.error.bind(console))
    .pipe(process.stdout);
})();
