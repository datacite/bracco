import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',

  didInsertElement() {
    let text = this.get('tag.text');

    if (text.match(/^\d/)) {
      this.set('text', text.substr(text.indexOf(" ") + 1).toLowerCase());
    } else {
      this.set('text', text.toLowerCase());
    }
  }
});