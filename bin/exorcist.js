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
  const argv = minimist(process.argv.slice(2)
    , { boolean: [ 'h', 'help', 'e', 'error-on-missing' ]
      , string: [ 'url', 'u', 'root', 'r', 'base', 'b' ]
    });

  if (argv.h || argv.help) return usage();


  let mapfile = argv._.shift();
  if (!mapfile) {
    console.error('Missing map file');
    return usage();
  }

  const url            = argv.url            || argv.u;
  const root           = argv.root           || argv.r;
  const base           = argv.base           || argv.b;
  const errorOnMissing = argv.errorOnMissing || argv.e || argv['error-on-missing'];

  mapfile = path.resolve(mapfile);

  process.stdin
    .pipe(exorcist(mapfile, url, root, base, errorOnMissing))
    .on('error', onerror)
    .on('missing-map', console.error.bind(console))
    .pipe(process.stdout);
})();
