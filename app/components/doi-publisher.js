// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiPublisher extends Component {
  @service
  store;

  constructor(...args) {
    super(...args);

    this.organizations = this.organizations || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.publisher) {
      this.model.publisher = this.store.createFragment('publisher');
    }
  }

  updatePublisher(organizationRecord) {
    if (organizationRecord) {
      this.fragment.name = organizationRecord.name;
      this.name = organizationRecord.name;
      this.fragment.publisherIdentifier = organizationRecord.id;
      this.fragment.schemeUri = 'https://ror.org';
      this.fragment.publisherIdentifierScheme = 'ROR';
    } else {
      this.fragment.name = '';
      this.fragment.publisherIdentifier = null;
      this.fragment.schemeUri = null;
      this.fragment.publisherIdentifierScheme = null;
      this.fragment.lang = null;
    }
  }

  @action
  createOnEnter(select, e) {
    if (e.keyCode === 13 && select.isOpen && !isBlank(select.searchText)) {
      select.actions.choose(select.searchText);
      this.fragment.name = select.searchText;
      this.fragment.publisherIdentifier = null;
      this.fragment.schemeUri = null;
      this.fragment.publisherIdentifierScheme = null;
      this.fragment.lang = null;
    }
  }

  @action
  searchRor(query) {
    let self = this;
    this.store
      .query('ror', { query })
      .then(function (organizations) {
        // ROR API does not seem to offer sorting of results.  The Ember array 'sortBy' seems to work.
        organizations = organizations.sortBy('name')
        self.set('organizations', organizations);
      })
      .catch(function (reason) {
        return [];
      });
  }

  @action
  selectRor(ror) {
    this.updatePublisher(ror);
  }

  @action
  updatePublisherIdentifier(value) {
    this.fragment.publisherIdentifier = value;
  }
}
