import Component from '@ember/component';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const clientTypeList = [
  'repository',
  'periodical'
]
const softwareList = [
  'CKAN',
  'Dataverse',
  'DSpace',
  'EPrints',
  'Fedora',
  'Invenio',
  'Islandora',
  'Nesstar',
  'Open Journal Systems (OJS)',
  'Samvera',
  'Other'
]

export default Component.extend({
  currentUser: service(),
  store: service(),

  edit: false,
  change: false,
  delete: false,
  periodical: null,
  provider: null,
  setPassword: false,
  re3data: null,
  repositories: [],
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,

  reset() {
    this.periodical.set('passwordInput', null);
    this.set('edit', false);
    this.set('change', false);
    this.set('delete', false);
  },
  generate() {
    let self = this;
    let url = ENV.API_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.currentUser.get('jwt')
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          self.get('model').set('passwordInput', data.phrase);
        });
      } else {
        console.log(response);
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
  searchClientType(query) {
    var clientTypes = clientTypeList.filter(function(clientType) {
      return clientType.startsWith(query.toLowerCase());
    })
    this.set('clientTypes', clientTypes);
  },
  selectClientType(clientType) {
    this.periodical.set('clientType', clientType);
    this.set('clientTypes', clientTypeList);
  },
  searchSoftware(query) {
    var softwares = softwareList.filter(function (software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.periodical.set('software', software);
    this.set('softwares', softwareList);
  },

  actions: {
    edit(periodical) {
      this.set('periodical', periodical);
      this.periodical.set('confirmSymbol', periodical.get('symbol'));
      this.set('edit', true);
    },
    change(periodical) {
      this.set('periodical', periodical);
      this.periodical.set('confirmSymbol', periodical.get('symbol'));
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(periodical) {
      this.set('periodical', periodical);
      this.periodical.set('confirmSymbol', null);
      this.periodical.validateSync();
      this.set('provider', periodical.get('provider'));
      this.set('delete', true);
    },
    setPassword() {
      let self = this;
      this.periodical.set('keepPassword', false);
      this.periodical.save().then(function () {
        self.reset();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    submit(periodical) {
      let self = this;

      // Remove all whitespace on domains.
      if (periodical.get('domains')) {
        var domains = periodical.get('domains');
        periodical.set('domains', domains.replace(/\s/g, ''));
      }

      periodical.save().then(function () {
        self.reset();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    destroy(periodical) {
      let self = this;
      this.store.findRecord("periodical", periodical.id, { backgroundReload: false }).then(function (periodical) {
        periodical.destroyRecord().then(function () {
          self.router.transitionTo('providers.show.settings', self.get('provider'));
        });
      });
    },
    // destroy(client) {
    //   let self = this;
    //   if (this.get('confirmId') === client.get('symbol')) {
    //     client.destroyRecord().then(function () {
    //       self.get('router').transitionTo('providers.show.settings', self.get('provider'));
    //     }).catch(function(reason){
    //       Ember.Logger.assert(false, reason);
    //     });
    //   }
    // },
    cancel() {
      this.model.rollbackAttributes();
      this.reset();
    },
    onSuccess() {
    },
    onError(error) {
      if (console.debug) {
        console.debug(error);
      } else {
        console.log(error);
      }
    },
    searchClientType(query) {
      this.searchClientType(query);
    },
    selectClientType(clientType) {
      this.selectClientType(clientType);
    },
    searchSoftware(query) {
      this.searchSoftware(query);
    },
    selectSoftware(software) {
      this.selectSoftware(software);
    }
  }
});
