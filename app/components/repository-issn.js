import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  // actions: {
  //   updateNameIdentifier(value) {
  //     this.updateNameIdentifier(value);
  //   },
  //   deleteNameIdentifier() {
  //     this.creator.get('nameIdentifiers').removeObject(this.fragment);
  //   },
  // }
});
