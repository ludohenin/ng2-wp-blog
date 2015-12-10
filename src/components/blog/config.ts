import {provide} from 'angular2/angular2';
import {WpCollectionConfig} from './services/services';


const ENV = '<%= APP_ENV %>';

const CONFIG_DEV = {
  WP_API_ROOT: 'https://3dots.io/wp-blog-test/wp-json',
  WP_API_NAMESPACE: '/wp/v2',
  DISQUS_SRC: 'https://3dotsblogtest.disqus.com/embed.js'
};

const CONFIG_PROD = {
  WP_API_ROOT: 'https://3dots.io/wp-blog/wp-json',
  WP_API_NAMESPACE: '/wp/v2',
  DISQUS_SRC: 'https://3dotsblog.disqus.com/embed.js'
};

const CONFIG = 'dev' === ENV ? CONFIG_DEV : CONFIG_PROD;

export class Config {
  WP_API_ROOT: string;
  WP_API_NAMESPACE: string;
  DISQUS_SRC: string;
}

export const BLOG_CONFIG_PROVIDERS = [
  provide(WpCollectionConfig, { useValue: {
    urlRoot: CONFIG.WP_API_ROOT,
    namespace: CONFIG.WP_API_NAMESPACE
  }}),
  provide(Config, { useValue: CONFIG })
];
