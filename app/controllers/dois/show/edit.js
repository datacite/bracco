import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

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
      doi.set('source', 'fabricaForm');

      // don't send xml
      doi.set('xml', null);

      // Don't try and set the landingPage information for DOI Updates
      doi.set('landingPage', null);

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

      // // only store descriptions with a description text
      // doi.set('language', A(doi.get('language')).filter(function(language) {
      //   return !isBlank(language);
      // }));

      // only store descriptions with a description text
      doi.set('descriptions', A(doi.get('descriptions')).filter(function(description) {
        return !isBlank(description.description);
      }));

      // only store titles with a title text
      doi.set('titles', A(doi.get('titles')).filter(function(title) {
        return !isBlank(title.title);
      }));

      // // only store name identifiers and affiliations with a value
      // A(doi.get('geoLocations')).forEach((geoLocation) => {
      //   geoLocation.set('geoLocationPlace', A(geoLocation.get('geoLocationPlace')).filter(function(geoLocation) {
      //     return !isBlank(geoLocation.geoLocationPlace);
      //   }));
      //   // geoLocation.set('affiliation', A(geoLocation.get('affiliation')).filter(function(affiliation) {
      //   //   return !isBlank(affiliation.name);
      //   // }));
      //   // if (geoLocation.nameType === 'Organizational') {
      //   //   geoLocation.set('givenName', null);
      //   //   geoLocation.set('familyName', null);
      //   // }
      // });

      let self = this;
      doi.save().then(function(doi) {

        self.transitionToRoute('dois.show', doi);
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('dois.show', this.model);
    },
  },
});
