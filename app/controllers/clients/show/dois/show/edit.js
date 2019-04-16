import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

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

      // schema-version will be determined by API
      doi.set('schemaVersion', null);

      // track use of the form
      doi.set("source", "fabricaForm");

      // don't send xml
      doi.set("xml", null);

      // only store name identifiers with a value
      // store affiliations only with a value and as an array of strings
      doi.get('creators').forEach((creator) => {
        creator.set('nameIdentifiers', creator.get('nameIdentifiers').filter(function(nameIdentifier) {
          return !isBlank(nameIdentifier.nameIdentifier);
        }));
        creator.set('affiliation', creator.get('affiliation').filter(function(affiliation) {
          return !isBlank(affiliation);
        }));
      });

      // only store descriptions with a description text
      doi.set('descriptions', doi.get('descriptions').filter(function(description) {
        return !isBlank(description.description);
      }));

      // only store titles with a title text
      doi.set('titles', doi.get('titles').filter(function(title) {
        return !isBlank(title.title);
      }));

      let self = this;
      doi.save().then(function (doi) {

        self.transitionToRoute('clients.show.dois.show', doi.get('client.id'), doi);
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('clients.show.dois.show', this.model.get('client.id'), this.model);
    }
  }
});
