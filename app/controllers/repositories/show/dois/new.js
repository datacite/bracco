import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Controller.extend({
  spdx: service(),
  features: service(),

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
      doi.set('event', this.setEvent(doi.state));

      // track use of the form
      doi.set('source', 'fabricaForm');

      // don't send xml
      doi.set('xml', null);

      // only store name identifiers and affiliations with a value
      A(doi.creators).forEach((creator) => {
        creator.set(
          'nameIdentifiers',
          A(creator.nameIdentifiers).filter(function (nameIdentifier) {
            return !isBlank(nameIdentifier.nameIdentifier);
          })
        );
        creator.set(
          'affiliation',
          A(creator.affiliation).filter(function (affiliation) {
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
        A(doi.titles).filter(function (title) {
          return !isBlank(title.title);
        })
      );

      // only store subject with a subject text
      doi.set(
        'subjects',
        A(doi.subjects).filter(function (subject) {
          return !isBlank(subject.subject);
        })
      );

      // only store name identifiers and affiliations for contributor with a value
      doi.set(
        'contributors',
        A(doi.contributors).filter(function (contributor) {
          let nameIdentifiers = A(contributor.nameIdentifiers).filter(function (
            nameIdentifier
          ) {
            return !isBlank(nameIdentifier.nameIdentifier);
          });
          let affiliation = A(contributor.affiliation).filter(function (
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
        A(doi.dates).filter(function (date) {
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
        A(doi.relatedIdentifiers).filter(function (identifier) {
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
        A(doi.descriptions).filter(function (description) {
          return !isBlank(description.description);
        })
      );

      doi.set(
        'geoLocations',
        A(doi.geoLocations).filter(function (geoLocation) {
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
        A(doi.alternateIdentifiers).filter(function (alternateIdentifier) {
          return !isBlank(alternateIdentifier.identifier);
        })
      );

      // only store rights with a text
      doi.set(
        'rightsList',
        A(doi.rightsList).filter(function (rights) {
          return !isBlank(rights.rights);
        })
      );

      // only store sizes with a text
      doi.set(
        'sizes',
        A(doi.sizes).filter(function (size) {
          return !isBlank(size);
        })
      );

      // only store formats with a text
      doi.set(
        'formats',
        A(doi.formats).filter(function (format) {
          return !isBlank(format);
        })
      );

      // only store funding references with a text
      doi.set(
        'fundingReferences',
        A(doi.fundingReferences).filter(function (fundingReference) {
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
      doi
        .save()
        .then(function (doi) {
          self.transitionToRoute('dois.show', doi);
        })
        .catch(function (reason) {
          console.debug(reason);

          self.flashMessages.warning(
            'An error occured and this DOI could not be saved.',
            {
              componentName: 'doi-error'
            }
          );
        });
    },
    cancel() {
      this.transitionToRoute(
        'repositories.show.dois',
        this.model.repository.id
      );
    }
  }
});
