import {ENV} from './config';

const APP_CONFIG_DEV = {
  WP_API_ROOT: 'https://3dots.io/wp-blog-test/wp-json',
  WP_API_NAMESPACE: '/wp/v2',
  GA_ID: 'UA-71460906-1'
};

const APP_CONFIG_PROD = {
  WP_API_ROOT: 'https://3dots.io/wp-blog/wp-json',
  WP_API_NAMESPACE: '/wp/v2',
  DISQUS_SRC: 'https://3dots-blog.disqus.com/embed.js',
  GA_ID: 'UA-71414560-1'
};

export const APP_CONFIG = ('prod' === ENV ? APP_CONFIG_PROD : APP_CONFIG_DEV);
