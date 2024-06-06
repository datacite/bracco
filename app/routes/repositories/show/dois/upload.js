import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

@classic
export default class UploadRoute extends Route {
  @service
  can;

  @service
  store;

  model() {
    let repository = this.modelFor('repositories/show');
    let doi = this.store.createRecord('doi', {
      repository,
      mode: 'upload',
      state: 'draft'
    });

    return hash({
      repository,
      doi
    });
  }

  // afterModel(model) {
  //   if (this.get('can').cannot('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
}
