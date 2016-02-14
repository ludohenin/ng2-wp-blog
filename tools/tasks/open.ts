import * as openResource from 'open';
import {APP_BASE, APP_DEST, PORT} from '../config';

export = function open() {
  return function (done) {
    openResource('http://localhost:' + PORT + APP_BASE + APP_DEST);
  };
};
