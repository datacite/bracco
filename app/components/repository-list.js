import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
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
}
