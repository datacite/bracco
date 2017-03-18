import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const owner = Ember.getOwner(this);
    const routeName = owner.lookup('router:main').currentRouteName;

    this.set('routeName', routeName);
  },
});
