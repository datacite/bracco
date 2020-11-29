import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

export default Controller.extend({
  spdx: service(),
  store: service(),
  features: service(),

  setEvent(stateChange) {
    if (stateChange[0] === 'draft' && stateChange[1] === 'registered') {
      return 'register';
    } else if (stateChange[0] === 'draft' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (
      stateChange[0] === 'registered' &&
      stateChange[1] === 'findable'
    ) {
      return 'publish';
    } else if (
      stateChange[0] === 'findable' &&
      stateChange[1] === 'registered'
    ) {
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
      doi.set('schemaVersion', 'http://datacite.org/schema/kernel-4');

      // track use of the form
      doi.set('source', 'fabricaForm');

      // don't send xml
      doi.set('xml', null);

      // Don't try and set the landingPage information for DOI Updates
      doi.set('landingPage', null);

      // only store name identifiers and affiliations for creators with a value
      A(doi.get('creators')).forEach((creator) => {
        creator.set(
          'nameIdentifiers',
          A(creator.get('nameIdentifiers')).filter(function (nameIdentifier) {
            return !isBlank(nameIdentifier.nameIdentifier);
          })
        );
        creator.set(
          'affiliation',
          A(creator.get('affiliation')).filter(function (affiliation) {
            return !isBlank(affiliation.name);
          })
        );
        if (creator.nameType === 'Organizational') {
          creator.set('givenName', null);
          creator.set('familyName', null);
        }
      });

      // only store titles with a title text
      doi.set(
        'titles',
        A(doi.get('titles')).filter(function (title) {
          return !isBlank(title.title);
        })
      );

      // only store subject with a subject text
      doi.set(
        'subjects',
        A(doi.get('subjects')).filter(function (subject) {
          return !isBlank(subject.subject);
        })
      );

      // only store name identifiers and affiliations for contributor with a value
      doi.set(
        'contributors',
        A(doi.get('contributors')).filter(function (contributor) {
          let nameIdentifiers = A(contributor.get('nameIdentifiers')).filter(
            function (nameIdentifier) {
              return !isBlank(nameIdentifier.nameIdentifier);
            }
          );
          let affiliation = A(contributor.get('affiliation')).filter(function (
            affiliation
          ) {
            return !isBlank(affiliation.name);
          });

          let contributorType = !isBlank(contributor.contributorType)
            ? [contributor.contributorType]
            : [];

          return (
            !isBlank(nameIdentifiers) ||
            !isBlank(affiliation) ||
            !isBlank(contributorType) ||
            !isBlank(contributor.name)
          );
        })
      );

      // only store dates with a text
      doi.set(
        'dates',
        A(doi.get('dates')).filter(function (date) {
          return (
            !isBlank(date.date) ||
            !isBlank(date.dateType) ||
            !isBlank(date.dateInformation)
          );
        })
      );

      // only store related identifiers with a text
      doi.set(
        'relatedIdentifiers',
        A(doi.get('relatedIdentifiers')).filter(function (identifier) {
          return (
            !isBlank(identifier.relatedIdentifier) ||
            !isBlank(identifier.relatedIdentifierType) ||
            !isBlank(identifier.relationType) ||
            !isBlank(identifier.relatedMetadataScheme) ||
            !isBlank(identifier.resourceTypeGeneral)
          );
        })
      );

      // only store descriptions with a description text
      doi.set(
        'descriptions',
        A(doi.get('descriptions')).filter(function (description) {
          return !isBlank(description.description);
        })
      );

      doi.set(
        'geoLocations',
        A(doi.get('geoLocations')).filter(function (geoLocation) {
          let point =
            isBlank(geoLocation.geoLocationPoint.pointLongitude) &&
            isBlank(geoLocation.geoLocationPoint.pointLatitude)
              ? []
              : [geoLocation.geoLocationPoint];
          let box =
            isBlank(geoLocation.geoLocationBox.westBoundLongitude) &&
            isBlank(geoLocation.geoLocationBox.eastBoundLongitude) &&
            isBlank(geoLocation.geoLocationBox.southBoundLatitude) &&
            isBlank(geoLocation.geoLocationBox.northBoundLatitude)
              ? []
              : [geoLocation.geoLocationBox];

          return (
            !isBlank(geoLocation.geoLocationPlace) ||
            !isBlank(point) ||
            !isBlank(box)
          );
        })
      );

      // only store identifiers with a  text
      doi.set(
        'alternateIdentifiers',
        A(doi.get('alternateIdentifiers')).filter(function (
          alternateIdentifier
        ) {
          return !isBlank(alternateIdentifier.identifier);
        })
      );

      // only store rights with a text
      doi.set(
        'rightsList',
        A(doi.get('rightsList')).filter(function (rights) {
          return !isBlank(rights.rights);
        })
      );

      // only store sizes with a text
      doi.set(
        'sizes',
        A(doi.get('sizes')).filter(function (size) {
          return !isBlank(size);
        })
      );

      // only store formats with a text
      doi.set(
        'formats',
        A(doi.get('formats')).filter(function (format) {
          return !isBlank(format);
        })
      );

      // only store funding references with a text
      doi.set(
        'fundingReferences',
        A(doi.get('fundingReferences')).filter(function (fundingReference) {
          return (
            !isBlank(fundingReference.funderName) ||
            !isBlank(fundingReference.funderIdentifier) ||
            !isBlank(fundingReference.funderIdentifierType) ||
            !isBlank(fundingReference.awardNumber) ||
            !isBlank(fundingReference.awardTitle)
          );
        })
      );

      let self = this;
      doi.save().then(function (doi) {
        self.transitionToRoute('dois.show', doi);
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('dois.show', this.model);
    }
  }
});
