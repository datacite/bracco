import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  edit: false,
  provider: null,

  actions: {
    edit(provider) {
      this.set('provider', provider);
      this.set('edit', true);
    },
    submit() {
      this.provider.save();
      this.set('edit', false);
    },
    cancel() {
      this.set('edit', false);
    },
  },
});
