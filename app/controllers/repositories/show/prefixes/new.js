import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      var repositoryPrefix = this.store.createRecord('repositoryPrefix', { repository: this.get('model.repository'), prefix: this.get('model.prefix.prefix') });
      repositoryPrefix.save().then(function(repositoryPrefix) {
        self.transitionToRoute('repositories.show.prefixes', repositoryPrefix.get('repository').get('id'));
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