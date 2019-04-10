import Controller from '@ember/controller';
import { filter } from '@ember/object/computed';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  setEvent(state) {
    if (state === 'registered') {
      return 'register';
    } else if (state === 'findable') {
      return 'publish';
    } else {
      return null;
    }
  },

  actions: {
    submit(doi) {
      doi.set('event', this.setEvent(doi.get('state')));

      // track use of the form
      doi.set("source", "fabricaForm");

      // only store descriptions with a description text
      // doi.set('descriptions', filter(doi.get('descriptions'), function(description) {
      //   return !isBlank(description.description);
      // }));

      let self = this;
      doi.save().then(function (doi) {
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      }).catch(function (reason) {
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
        self.get('flashMessages').warning('This DOI name already exists. Please use a different DOI name.', { componentName: 'duplicated-doi' });
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois', this.get('model.client.id'));
    }
  }
});
