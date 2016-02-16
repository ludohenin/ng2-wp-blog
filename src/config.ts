interface IAppConfig {
  WP_API_ROOT: string;
  WP_API_NAMESPACE: string;
  DISQUS_SRC: string;
  GA_ID: string;
}

export const APP_CONFIG: IAppConfig = JSON.parse('<%= JSON.stringify(APP_CONFIG) %>');
