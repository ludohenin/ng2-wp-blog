import {APP_BASE, APP_DEST, APP_ROOT, APP_TITLE, APP_ENV, DISQUS_SRC, ENV, SYSTEM_CONFIG, VERSION} from '../config';

// TODO: Add an interface to register more template locals.
export function templateLocals() {
  return {
    APP_BASE,
    APP_DEST,
    APP_ROOT,
    APP_TITLE,
    APP_ENV,
    DISQUS_SRC,
    ENV,
    SYSTEM_CONFIG,
    VERSION
  };
}
