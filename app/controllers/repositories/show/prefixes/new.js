import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      var clientPrefix = this.store.createRecord('clientPrefix', { client: this.get('model.repository'), prefix: this.get('model.prefix.prefix') });
      clientPrefix.save().then(function(clientPrefix) {
        self.transitionToRoute('repositories.show.prefixes', clientPrefix.get('client'));
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