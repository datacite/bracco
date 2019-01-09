import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {
    let creatorNumber = this.model.get('creatorsCsv').split("\n").length;

    if (creatorNumber > 24) {
      this.set('creatorNumber', 25);
    } else {
      this.set('creatorNumber', creatorNumber + 1);
    }
  }
});
