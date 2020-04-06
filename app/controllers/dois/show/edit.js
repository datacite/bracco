import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

export default Controller.extend({
  spdx: service(),
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


      // only store identifiers with a  text
      doi.set('contributors', A(doi.get('contributors')).filter(function(contributor) {
        let nameIdentifiers = A(contributor.get('nameIdentifiers')).filter(function(nameIdentifier) {
          return !isBlank(nameIdentifier.nameIdentifier);
        });
        let affiliation = A(contributor.get('affiliation')).filter(function(affiliation) {
          return !isBlank(affiliation.name);
        });

        let contributorType = !isBlank(contributor.contributorType) ? [ contributor.contributorType ] : [];

        return !isBlank(nameIdentifiers) && !isBlank(affiliation) && !isBlank(contributorType) && !isBlank(contributor.name);
      }));

      // only store identifiers with a  text
      doi.set('relatedIdentifiers', A(doi.get('relatedIdentifiers')).filter(function(identifier) {
        return !isBlank(identifier.relatedIdentifier);
      }));

      // only store identifiers with a  text
      doi.set('fundingReferences', A(doi.get('fundingReferences')).filter(function(fundingReference) {
        return !isBlank(fundingReference.funderName);
      }));

      // only store identifiers with a  text
      doi.set('rightsList', A(doi.get('rightsList')).filter(function(rights) {
        return !isBlank(rights.rights);
      }));

      // only store identifiers with a  text
      doi.set('dates', A(doi.get('dates')).filter(function(date) {
        return !isBlank(date.date);
      }));

      // only store identifiers with a  text
      doi.set('formats', A(doi.get('formats')).filter(function(format) {
        return !isBlank(format);
      }));

      // only store identifiers with a  text
      doi.set('sizes', A(doi.get('sizes')).filter(function(size) {
        return !isBlank(size);
      }));

      // // only store descriptions with a description text
      // doi.set('language', A(doi.get('language')).filter(function(language) {
      //   return !isBlank(language);
      // }));

      // only store descriptions with a description text
      doi.set('descriptions', A(doi.get('descriptions')).filter(function(description) {
        return !isBlank(description.description);
      }));

      // only store identifiers with a  text
      doi.set('identifiers', A(doi.get('identifiers')).filter(function(identifier) {
        return !isBlank(identifier.identifier);
      }));

      // only store titles with a title text
      doi.set('titles', A(doi.get('titles')).filter(function(title) {
        return !isBlank(title.title);
      }));

      doi.set('geoLocations', A(doi.get('geoLocations')).filter(function(geoLocation) {
        let point = isBlank(geoLocation.geoLocationPoint.pointLongitude) &&
         isBlank(geoLocation.geoLocationPoint.pointLatitude) ? [] : [ geoLocation.geoLocationPoint ];
        let box = isBlank(geoLocation.geoLocationBox.westBoundLongitude) &&
        isBlank(geoLocation.geoLocationBox.eastBoundLongitude) &&
        isBlank(geoLocation.geoLocationBox.southBoundLatitude) &&
        isBlank(geoLocation.geoLocationBox.northBoundLatitude) ? [] : [ geoLocation.geoLocationBox ];

        return !isBlank(geoLocation.geoLocationPlace) || !isBlank(point) || !isBlank(box);
      }));


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
