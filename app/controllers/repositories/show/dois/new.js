import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

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
      doi.set('source', 'fabricaForm');

      // don't send xml
      doi.set('xml', null);

      // only store subject with a subject text
      doi.set('subjects', A(doi.get('subjects')).filter(function(subject) {
        return !isBlank(subject.subject);
      }));

      // only store name identifiers and affiliations with a value
      A(doi.get('creators')).forEach((creator) => {
        creator.set('nameIdentifiers', A(creator.get('nameIdentifiers')).filter(function(nameIdentifier) {
          return !isBlank(nameIdentifier.nameIdentifier);
        }));
        creator.set('affiliation', A(creator.get('affiliation')).filter(function(affiliation) {
          return !isBlank(affiliation.name);
        }));
        if (creator.nameType === 'Organizational') {
          creator.set('givenName', null);
          creator.set('familyName', null);
        }
      });

      // only store name identifiers and affiliations with a value
      A(doi.get('contributors')).forEach((contributor) => {
        contributor.set('nameIdentifiers', A(contributor.get('nameIdentifiers')).filter(function(nameIdentifier) {
          return !isBlank(nameIdentifier.nameIdentifier);
        }));
        contributor.set('affiliation', A(contributor.get('affiliation')).filter(function(affiliation) {
          return !isBlank(affiliation.name);
        }));
        if (contributor.nameType === 'Organizational') {
          contributor.set('givenName', null);
          contributor.set('familyName', null);
        }
      });

      // only store descriptions with a description text
      doi.set('descriptions', A(doi.get('descriptions')).filter(function(description) {
        return !isBlank(description.description);
      }));


      // only store identifiers with a  text
      doi.set('identifiers', A(doi.get('identifiers')).filter(function(identifier) {
        return !isBlank(identifier.identifier);
      }));


      // only store descriptions with a description text
      // doi.set('language', A(doi.get('language')).filter(function(language) {
      //   return !isBlank(language);
      // }));

      // only store titles with a title text
      doi.set('titles', A(doi.get('titles')).filter(function(title) {
        return !isBlank(title.title);
      }));

      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('dois.show', doi);
      }).catch(function(reason) {
        console.debug(reason);

        self.get('flashMessages').warning('An error occured and this DOI could not be saved.', { componentName: 'doi-error' });
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.dois', this.get('model.repository.id'));
    },
  },
});
