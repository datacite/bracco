import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';

@classic
export default class DoiPublisher extends Component {
  @service
  store;

  init(...args) {
    super.init(...args);

    this.organizations = this.organizations || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('publisher')) {
      this.model.set('publisher', this.store.createFragment('publisher'));
    }
  }

  updatePublisher(organizationRecord) {
    if (organizationRecord) {
      this.fragment.set('name', organizationRecord.name);
      this.set('name', organizationRecord.name);
      this.fragment.set('publisherIdentifier', organizationRecord.id);
      this.fragment.set('schemeUri', 'https://ror.org');
      this.fragment.set('publisherIdentifierScheme', 'ROR');
    } else {
      this.fragment.set('name', '');
      this.fragment.set('publisherIdentifier', null);
      this.fragment.set('schemeUri', null);
      this.fragment.set('publisherIdentifierScheme', null);
      this.fragment.set('lang', null);
    }
  }

  @action
  createOnEnter(select, e) {
    if (e.keyCode === 13 && select.isOpen && !isBlank(select.searchText)) {
      select.actions.choose(select.searchText);
      this.fragment.set('name', select.searchText);
      this.fragment.set('publisherIdentifier', null);
      this.fragment.set('schemeUri', null);
      this.fragment.set('publisherIdentifierScheme', null);
      this.fragment.set('lang', null);
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
    this.fragment.set('publisherIdentifier', value);
  }
}
