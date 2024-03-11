import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',

  didReceiveAttrs() {
    this._super(...arguments);
  },

  didRender() {
    this._super(...arguments);

    window.MathJax.typesetClear([this.element]);
    this.element.innerHTML = this.text;
    window.MathJax.typeset([this.element]);
  }
});
