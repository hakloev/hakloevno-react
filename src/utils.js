import axios from 'axios';

import config from '../config';

import { Renderer } from 'marked';
import highlight from 'highlightjs';

// const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

const getBaseURL = () => {
  if (__CLIENT__) {
    return window.location.origin;
  } else if (process.env.IS_DOCKER == 'true') {
    return `http://${config.hosts.django}:${config.ports.django}`
  } else {
    return `http://localhost:${config.ports.server}`;
  }
}

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
  getBaseURL,
}
