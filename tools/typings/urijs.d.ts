declare module 'urijs/src/URITemplate' {
  function URITemplate(template: string): Template
  interface Template {
    expand(obj: any): Template;
  }
  module URITemplate {}
  export = URITemplate;
}
