import Vue from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md = new MarkdownIt();

Vue.directive('render-content', {
  bind(el, binding) {
    const { contentType, content } = binding.value;

    if (contentType === 1) {
      const renderedHTML = md.render(content);
      el.innerHTML = renderedHTML;
    } else if (contentType === 0) {
      let processedContent = content.replace(/<pre class="ql-syntax">/g, '<pre class="hljs">');
      el.innerHTML = processedContent;
    }

    // 在 Vue.nextTick 中进行代码高亮处理
    Vue.nextTick(() => {
      Array.from(el.querySelectorAll('pre code')).forEach(block => {
        if (!block.className) {
          block.classList.add('javascript'); // 添加默认类名
        }
        try {
          hljs.highlightElement(block); // 使用 highlightElement 替代 highlightBlock
        } catch (e) {
          console.log(e);
        }
      });
    });
  },
});
