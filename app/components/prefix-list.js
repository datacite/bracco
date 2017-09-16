import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  firstPrefix: null,
  lastPrefix: null,

  addPrefixes() {
    let first = this.get('firstPrefix').split('.').get('lastObject');
    let last = this.get('lastPrefix').split('.').get('lastObject')
    let str = '10.' + first;

    var prefix = this.get('store').createRecord('prefix', { id: str });
    prefix.save();
  },
  reset() {
    this.set('firstPrefix', null);
    this.set('lastPrefix', null);
    this.set('new', false);
  },

  actions: {
    new() {
      this.set('new', true);
    },
    submitFirstPrefix(firstPrefix) {
      this.set('firstPrefix', firstPrefix);
    },
    submitLastPrefix(lastPrefix) {
      this.set('lastPrefix', lastPrefix);
    },
    submit() {
      this.addPrefixes()
      this.reset();
    },
    cancel() {
      this.reset();
    }
  }
});
