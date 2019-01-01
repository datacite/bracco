import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      var providerPrefix = this.store.createRecord('providerPrefix', { provider: this.get('model.provider'), prefix: this.get('model.prefix.prefix') });
      providerPrefix.save().then(function(providerPrefix) {
        self.transitionToRoute('providers.show.prefixes', providerPrefix.get('provider'));
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      this.transitionToRoute('providers.show.prefixes', this.get('model.provider'));
    }
  }
});
