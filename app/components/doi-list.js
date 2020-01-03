import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['row'],

  isPerson(){
    this.get('model.name')
    console.log(this.get('model.name'))
    console.log(this.model.name)
    return this.model.name == "user";
  },
  actions: {
    isPerson() {
      this.isPerson();
    }
  }
});
