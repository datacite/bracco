import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Controller.extend({
  spdx: service(),

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

      // // only store subject with a subject text
      // doi.set('formats', A(doi.get('formats')).filter(function(format) {
      //   return !isBlank(format);
      // }));

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

      // // only store name identifiers and affiliations with a value
      // A(doi.get('contributors')).forEach((contributor) => {
      //   contributor.set('nameIdentifiers', A(contributor.get('nameIdentifiers')).filter(function(nameIdentifier) {
      //     return !isBlank(nameIdentifier.nameIdentifier);
      //   }));
      //   contributor.set('affiliation', A(contributor.get('affiliation')).filter(function(affiliation) {
      //     return !isBlank(affiliation.name);
      //   }));
      //   if (contributor.nameType === 'Organizational') {
      //     contributor.set('givenName', null);
      //     contributor.set('familyName', null);
      //   }
      // });

      // only store identifiers with a  text
      doi.set('contributors', A(doi.get('contributors')).filter(function(contributor) {
        let nameIdentifiers = A(contributor.get('nameIdentifiers')).filter(function(nameIdentifier) {
          return !isBlank(nameIdentifier.nameIdentifier);
        });
        let affiliation = A(contributor.get('affiliation')).filter(function(affiliation) {
          return !isBlank(affiliation.name);
        });

        let contributorType = !isBlank(contributor.contributorType) ? [ contributor.contributorType ] : [];

        return !isBlank(nameIdentifiers) || !isBlank(affiliation) || !isBlank(contributorType) || !isBlank(contributor.name);
      }));

      // only store descriptions with a description text
      doi.set('descriptions', A(doi.get('descriptions')).filter(function(description) {
        return !isBlank(description.description);
      }));


      // only store identifiers with a  text
      doi.set('identifiers', A(doi.get('identifiers')).filter(function(identifier) {
        return !isBlank(identifier.identifier);
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

      // only store descriptions with a description text
      // doi.set('language', A(doi.get('language')).filter(function(language) {
      //   return !isBlank(language);
      // }));

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
