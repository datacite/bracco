import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  flashMessages: service(),

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
      doi.set('formats', null);
      doi.set('sizes', null);
      doi.set('version', null);
      doi.set('creators', null);
      doi.set('titles', null);
      doi.set('descriptions', null);
      doi.set('publisher', null);
      doi.set('publicationYear', null);
      doi.set('types', null);
      doi.set('rightsList', null);
      doi.set('schemaVersion', null);
      doi.set('subjects', null);
      doi.set('language', null);
      doi.set('contributors', null);
      doi.set('alternateIdentifiers', null);
      doi.set('relatedIdentifiers', null);
      doi.set('fundingReferences', null);
      doi.set('geoLocations', null);
      doi.set('dates', null);
      doi.set('relatedItems', null);

      let self = this;
      doi
        .save()
        .then(function (doi) {
          self.router.transitionTo('dois.show', doi);
        })
        .catch(function (reason) {
          console.debug(reason);
          self
            .get('flashMessages')
            .warning(
              'An error occured and this DOI could not be saved.' + (reason?.title ? '  ' + reason.title : '')
              /*
                reason.errors[0]
                ? reason.errors[0].title
                : reason
                */
            );
        });
    },
    cancel() {
      this.router.transitionTo(
        'repositories.show.dois',
        this.get('model.repository.id')
      );
    }
  }
});
