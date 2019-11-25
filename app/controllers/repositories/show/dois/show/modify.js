import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  setEvent(stateChange) {
    if (stateChange[0] === 'draft' && stateChange[1] === 'registered') {
      return 'register';
    } else if (stateChange[0] === 'draft' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (stateChange[0] === 'registered' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (stateChange[0] === 'findable' && stateChange[1] === 'registered') {
      return 'hide';
    }
  },

  actions: {
    submit(doi) {
      // change state via event if there is a change
      let stateChange = doi.changedAttributes().state;
      if (typeof stateChange !== 'undefined') {
        doi.set('event', this.setEvent(stateChange));
      }

      let self = this;
      doi.save().then(function (doi) {
        self.transitionToRoute('repositories.show.dois.show', doi.get('repository.id'), doi);
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('repositories.show.dois.show', this.model.get('repository.id'), this.model);
    }
  }
});
