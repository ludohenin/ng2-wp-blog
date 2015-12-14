# ng2-wp-blog

WIP

# src folder structure

```bash
.
├── assets
│   ├── main.css
│   ├── prism.css
│   └── prism.min.js
├── bootstrap.ts
├── components
│   ├── app
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.ts
│   │   └── app_spec.ts
│   └── blog
│       ├── blog.css
│       ├── blog.html
│       ├── blog.ts
│       ├── blog_spec.ts
│       ├── components
│       │   ├── disqus
│       │   │   ├── disqus.css
│       │   │   ├── disqus.html
│       │   │   ├── disqus.ts
│       │   │   └── disqus_spec.ts
│       │   ├── navbar
│       │   │   ├── navbar.css
│       │   │   ├── navbar.html
│       │   │   ├── navbar.ts
│       │   │   └── navbar_spec.ts
│       │   ├── pagination
│       │   │   ├── pagination.css
│       │   │   ├── pagination.html
│       │   │   ├── pagination.ts
│       │   │   └── pagination_spec.ts
│       │   ├── post
│       │   │   ├── post.css
│       │   │   ├── post.html
│       │   │   ├── post.ts
│       │   │   └── post_spec.ts
│       │   └── posts
│       │       ├── posts.css
│       │       ├── posts.html
│       │       ├── posts.ts
│       │       └── posts_spec.ts
│       ├── directives
│       │   ├── directives.ts
│       │   └── excerpt.ts
│       └── services
│           ├── services.ts
│           └── wp
│               ├── posts.ts
│               ├── root.ts
│               ├── terms.ts
│               ├── users.ts
│               ├── wp.ts
│               ├── wp_resource.ts
│               └── xhr.ts
├── config.ts
└── index.html
```