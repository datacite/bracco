import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',

  didReceiveAttrs() {
    this._super(...arguments);

    let text = this.get('tag.text');

    if (text.match(/^\d/)) {
      this.set('text', text.substr(text.indexOf(' ') + 1).toLowerCase());
    } else {
      this.set('text', text.toLowerCase());
    }
  },
});