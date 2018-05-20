import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    let authorNumber = this.get('model').get('author').split("\n").length;

    if (authorNumber == 1) {
      this.set('authorNumber', 5);
    } else if (authorNumber > 25) { 
      this.set('authorNumber', 25);
    } else {
      this.set('authorNumber', authorNumber);
    }
  }
});
