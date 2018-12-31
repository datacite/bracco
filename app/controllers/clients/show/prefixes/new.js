import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      var clientPrefix = this.store.createRecord('clientPrefix', { client: this.get('model.client'), prefix: this.get('model.prefix.prefix') });
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