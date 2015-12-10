import * as CONFIG from '../config';

// TODO: Add an interface to register more template locals.
// If you want more control over what is passed to your app
// you can import just what you need.
export function templateLocals() {
  return CONFIG;
}
