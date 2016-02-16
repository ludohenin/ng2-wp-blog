export default JSON.parse('<%= JSON.stringify(APP_CONFIG) %>');

interface IAppConfig {
  WP_API_ROOT: string;
  WP_API_NAMESPACE: string;
  DISQUS_SRC: string;
  GA_ID: string;
}

const APP_CONFIG_COMMON = { // Dev & Common.
  WP_API_ROOT: 'https://3dots.io/wp-blog-test/wp-json',
  WP_API_NAMESPACE: '/wp/v2',
  DISQUS_SRC: 'https://3dotsblogtest.disqus.com/embed.js',
  GA_ID: 'UA-71460906-1'
};

const APP_CONFIG_PROD = {
  WP_API_ROOT: 'https://3dots.io/wp-blog/wp-json',
  WP_API_NAMESPACE: '/wp/v2',
  DISQUS_SRC: 'https://3dots-blog.disqus.com/embed.js',
  GA_ID: 'UA-71414560-1'
};

export const APP_CONFIG: IAppConfig = Object.assign(APP_CONFIG_COMMON,
  ('prod' === '<%= APP_ENV %>' ? APP_CONFIG_PROD : {}));
