// Finish conversion of this component to a @glimmer component.
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class RepositoryList extends Component {
  @service
  currentUser;

  @service
  store;

  @service
  prefixes;

  hasRequiredContacts = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // check that current user is staff, or has all required contacts set
    // this is separate from abilities as it triggers a specific error message
    if (this.currentUser.isAdmin) {
      this.hasRequiredContacts = true;
    } else if (
      this.currentUser.isConsortium ||
      this.currentUser.isProvider
    ) {
      let self = this;
      this.store
        .findRecord('provider', this.currentUser.provider_id)
        .then(function (provider) {
          self.hasRequiredContacts = provider.hasRequiredContacts;
        });
    }
  }
}
