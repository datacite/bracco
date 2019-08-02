import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      this.store.findRecord('client', this.get('model.repository.id')).then(function(client) {
        var clientPrefix = self.store.createRecord('clientPrefix', { client: client, prefix: this.get('model.prefix.prefix') });
        clientPrefix.save().then(function(clientPrefix) {
          self.transitionToRoute('repositories.show.prefixes', clientPrefix.get('client.id'));
        }).catch(function(reason){
          if (console.debug) {
            console.debug(reason);
          } else {
            console.log(reason);
          }
        });
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.prefixes', this.get('model.repository'));
    }
  }
});