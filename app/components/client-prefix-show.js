import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['panel', 'panel-transparent'],
  delete: null,
  clientPrefix: null,

  actions: {
    delete: function(clientPrefix) {
      this.set('clientPrefix', clientPrefix);
      this.set('delete', true);
    },
    cancel: function() {
      this.set('delete', false);
    },
    destroy: function() {
      this.get('clientPrefix').destroyRecord();
      this.get('clientPrefix').save();
      this.sendAction('refreshCurrentRoute');
      this.set('delete', false);
    },
  }
});
