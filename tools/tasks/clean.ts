import * as async from 'async';
import * as del from 'del';
import {APP_DEST, TEST_DEST, TMP_DIR, WP_DIR} from '../config';

export = function clean(gulp, plugins, option) {
  return function (done) {

    switch(option) {
      case 'all'    : cleanAll(done);     break;
      case 'dist'   : cleanDist(done);    break;
      case 'test'   : cleanTest(done);    break;
      case 'tmp'    : cleanTmp(done);     break;
      case 'wp'     : cleanWp(done);      break;
      default: done();
    }

  };
};

function cleanAll(done) {
  async.parallel([
    cleanDist,
    cleanTest,
    cleanTmp
  ], done);
}
function cleanDist(done) {
  del(APP_DEST, done);
}
function cleanTest(done) {
  del(TEST_DEST, done);
}
function cleanTmp(done) {
  del(TMP_DIR, done);
}
function cleanWp(done) {
  del(WP_DIR, {force: true}, done);
}
