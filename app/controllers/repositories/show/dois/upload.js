import Controller from '@ember/controller';

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

      // Reset content to null rather than use default values
      // We want the API to work out the values from the file XML
      doi.set('formats', []);
      doi.set('sizes', []);
      doi.set('version', null);
      doi.set('creators', []);
      doi.set('titles', []);
      doi.set('descriptions', []);
      doi.set('publisher', null);
      doi.set('publicationYear', null);
      doi.set('types', []);
      doi.set('rightsList', null);
      doi.set('schemaVersion', null);
      doi.set('subjects', []);
      doi.set('language', null);
      doi.set('contributors', []);
      doi.set('alternateIdentifiers', []);
      doi.set('relatedIdentifiers', []);
      doi.set('fundingReferences', []);
      doi.set('geoLocations', []);
      doi.set('dates', []);
      doi.set('relatedItems', []);

      let self = this;
      doi
        .save()
        .then(function (doi) {
          self.transitionToRoute('dois.show', doi);
        })
        .catch(function (reason) {
          console.debug(reason);
          self
            .get('flashMessages')
            .warning(
              'An error occured and this DOI could not be saved:' +
                reason.errors[0]
                ? reason.errors[0].title
                : reason
            );
        });
    },
    cancel() {
      this.transitionToRoute(
        'repositories.show.dois',
        this.get('model.repository.id')
      );
    }
  }
});
