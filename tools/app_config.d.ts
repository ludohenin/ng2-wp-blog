// Path to /{APP_SRC}/config.js file is set in /tools/config.ts => SYSTEMJS_CONF

declare module 'config' {
  var Config: AppConfigOptions;
  export = Config;

  interface AppConfigOptions {
    WP_API_ROOT: string;
    WP_API_NAMESPACE: string;
    DISQUS_SRC: string;
  }
}
