import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['panel', 'panel-transparent'],
  delete: null,
  providerPrefix: null,

  actions: {
    delete: function(providerPrefix) {
      this.set('providerPrefix', providerPrefix);
      this.set('delete', true);
    },
    cancel: function() {
      this.set('delete', false);
    },
    destroy: function() {
      this.get('providerPrefix').destroyRecord();
      this.get('providerPrefix').save();
      this.sendAction('refreshCurrentRoute');
      this.set('delete', false);
    },
  }
});
