# ng2-wp-blog

Angular2 application using Wordpress [JSON-API](http://v2.wp-api.org) backend.

It can be served as WP theme or from a seperate static files server.

## src folder structure

```bash
./src
├── app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   └── app.ts
├── assets
│   ├── main.css
│   ├── prism.css
│   └── prism.min.js
├── blog
│   ├── blog
│   │   ├── blog.component.css
│   │   ├── blog.component.html
│   │   ├── blog.component.spec.ts
│   │   └── blog.component.ts
│   ├── directives
│   │   ├── blog.directives.ts
│   │   └── excerpt.directive.ts
│   ├── disqus
│   │   ├── disqus.component.css
│   │   ├── disqus.component.html
│   │   ├── disqus.component.spec.ts
│   │   └── disqus.component.ts
│   ├── navbar
│   │   ├── navbar.component.css
│   │   ├── navbar.component.html
│   │   ├── navbar.component.spec.ts
│   │   └── navbar.component.ts
│   ├── pagination
│   │   ├── pagination.component.css
│   │   ├── pagination.component.html
│   │   ├── pagination.component.spec.ts
│   │   └── pagination.component.ts
│   ├── post
│   │   ├── post.component.css
│   │   ├── post.component.html
│   │   ├── post.component.spec.ts
│   │   └── post.component.ts
│   ├── posts
│   │   ├── posts.component.css
│   │   ├── posts.component.html
│   │   ├── posts.component.spec.ts
│   │   └── posts.component.ts
│   ├── services
│   │   ├── wp
│   │   │   ├── posts.ts
│   │   │   ├── root.ts
│   │   │   ├── terms.ts
│   │   │   ├── users.ts
│   │   │   ├── wp.ts
│   │   │   ├── wp_resource.ts
│   │   │   └── xhr.ts
│   │   └── wp.service.ts
│   └── blog.ts
├── shared
│   ├── pipes
│   │   └── moment.pipe.ts
│   ├── services
│   │   └── google_analytics.service.ts
│   ├── pipes.ts
│   └── services.ts
├── config.ts
├── index.html
├── index.php
├── main.ts
├── screenshot.png
└── style.css
```

## Contributors

![Contributors](https://webtask.it.auth0.com/api/run/wt-ludovic_henin-yahoo_com-0/contributors/ludohenin/ng2-wp-blog.svg)
