import { Renderer } from 'marked';
import highlight from 'highlightjs';

/*
  Custom renderer used to render highlight.js in the Post-components.
  Shamelessly stolen from: http://shuheikagawa.com/blog/2015/09/21/using-highlight-js-with-marked/
*/
const renderer = new Renderer();
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlight.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlight.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

export {
  renderer,
}
