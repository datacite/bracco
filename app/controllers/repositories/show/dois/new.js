import Controller from '@ember/controller';
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

      // don't send xml
      doi.set("xml", null);

      // only store descriptions that have a description text
      doi.set('descriptions', doi.get('descriptions').filter(function(description) {
        return !isBlank(description.description);
      }));

      // only store name identifiers and affiliations with a value
      doi.get('creators').forEach((creator) => {
        creator.set('nameIdentifiers', creator.get('nameIdentifiers').filter(function(nameIdentifier) {
          return !isBlank(nameIdentifier.nameIdentifier);
        }));
        creator.set('affiliation', creator.get('affiliation').filter(function(affiliation) {
          return !isBlank(affiliation.name);
        }));
        if (creator.nameType === 'Organizational') {
          creator.set('givenName', null);
          creator.set('familyName', null);
        }
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
        self.transitionToRoute('dois.show', doi);
      }).catch(function (reason) {
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
        self.get('flashMessages').warning('An error occured and this DOI could not be saved.', { componentName: 'doi-error' });
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.dois', this.get('model.repository.id'));
    },
    setCreatorValidations(value) {
      console.log(value)
    },
    setTitleValidations(value) {
      console.log(value)
    }
  }
});
