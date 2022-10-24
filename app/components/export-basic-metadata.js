import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  router: service(),
  tagName: 'div',
  classNames: ['export-basic-metadata'],
  repositoryId: reads('router.currentRoute.attributes.repository.id'),
  providerId: reads('router.currentRoute.attributes.provider.id')
})