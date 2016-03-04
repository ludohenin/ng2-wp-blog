'use strict';
var src = require('./package 2.json');
var tar = require('./package.json');

merge(src, tar);

function merge(src, tar) {
  var props = ['dependencies', 'devDependencies'];

  props.forEach(function (prop) {
    Object.keys(src[prop]).forEach(function (dep) {
      tar[prop][dep] = src[prop][dep];
    });
  });

  console.log(JSON.stringify(tar.dependencies, null, 2));
  console.log(JSON.stringify(tar.devDependencies, null, 2));
}
