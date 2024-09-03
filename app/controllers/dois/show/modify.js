import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class ModifyController extends Controller {
  @service
  store;

  @service
  router;

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
  }

  @action
  submitAction(doi) {
    // change state via event if there is a change
    let stateChange = doi.changedAttributes().state;
    if (typeof stateChange !== 'undefined') {
      doi.set('event', this.setEvent(stateChange));
    }

    // set individual attributes to null so that they don't overwrite what is in the xml attribute
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
    doi.set('language', null);
    doi.set('subjects', null);
    doi.set('contributors', null);
    doi.set('alternateIdentifiers', null);
    doi.set('relatedIdentifiers', null);
    doi.set('fundingReferences', null);
    doi.set('geoLocations', null);
    doi.set('dates', null);
    doi.set('relatedItems', null);

    // Don't try and set the landingPage information for DOI Updates
    doi.set('landingPage', null);

    let self = this;
    doi.save().then(function (doi) {
      self.router.transitionTo('dois.show', doi);
    });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.router.transitionTo('dois.show', this.model);
  }
}
