import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  store: service(),

  hasRequiredContacts: false,

  didReceiveAttrs() {
    this._super(...arguments);

    // check that current user is staff, or has all required contacts set
    // this is separate from abilities as it triggers a specific error message
    if (this.currentUser.get('isAdmin')) {
      this.set('hasRequiredContacts', true);
    } else if (
      this.currentUser.get('isConsortium') ||
      this.currentUser.get('isProvider')
    ) {
      let self = this;
      this.store
        .findRecord('provider', this.currentUser.get('provider_id'))
        .then(function (provider) {
          self.set('hasRequiredContacts', provider.get('hasRequiredContacts'));
        });
    }
  }
});
