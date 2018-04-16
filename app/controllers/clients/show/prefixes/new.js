import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      var clientPrefix = this.get('store').createRecord('clientPrefix', { client: this.get('model.client'), prefix: this.get('model.prefix.prefix') });
      clientPrefix.save().then(function(clientPrefix) {
        self.transitionToRoute('clients.show.prefixes', clientPrefix.get('client'));
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.prefixes', this.get('model.client'));
    }
  }
});