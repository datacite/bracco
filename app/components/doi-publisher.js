import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  init(...args) {
    this._super(...args);

    this.organizations = this.organizations || [];
  },
  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('publisher')) {
      this.model.set('publisher', this.store.createFragment('publisher'));
    }
  },
  updatePublisher(organizationRecord) {
    if (organizationRecord) {
      console.log(organizationRecord.name);
      this.fragment.set('name', organizationRecord.name);
      this.set('name', organizationRecord.name);
      this.fragment.set('publisherIdentifier', organizationRecord.id);
      this.fragment.set('schemeUri', 'https://ror.org');
      this.fragment.set('publisherIdentifierScheme', 'ROR');
    } else {
      this.fragment.set('name', null);
      this.fragment.set('publisherIdentifier', null);
      this.fragment.set('schemeUri', 'https://ror.org');
      this.fragment.set('publisherIdentifierScheme', 'ROR');
    }
  },

  actions: {
    searchRor(query) {
      let self = this;
      this.store
        .query('ror', { query })
        .then(function (organizations) {
          self.set('organizations', organizations);
        })
        .catch(function (reason) {
          console.debug(reason);
          return [];
        });
    },
    selectRor(ror) {
      this.updatePublisher(ror);
    }
  }
});
