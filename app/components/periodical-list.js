import { inject as service } from '@ember/service';
import Component from '@ember/component';
// import { computed } from '@ember/object';

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
  'Opus',
  'Samvera',
  'Other'
]

export default Component.extend({
  store: service(),

  tagName: 'div',
  classNames: ['row'],
  periodical: null,
  new: false,
  repository: null,
  repositories: [],
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,
  // availableClientCount: computed('model.provider', 'model.clients', function() {
  //   if (this.model.provider && this.model.provider.memberType === 'contractual_provider') {
  //     return 1 - this.model.clients.length;
  //   } else {
  //     return 500 - this.model.clients.length;
  //   }
  // }),

  selectRepository(repository) {
    if (repository) {
      let self = this;
      this.store.findRecord('repository', repository.id).then(function(repo) {
        self.set('repository', repo)
        self.get('periodical').set('repository', repo);
        self.get('periodical').set('name', repo.get('repositoryName'));
        self.get('periodical').set('description', repo.get('description'));
        self.get('periodical').set('url', repo.get('repositoryUrl'));
        if (repo.get('software').length > 0) {
          let software = repo.get('software')[0].name;
          if (software === "DataVerse") {
            software = "Dataverse";
          } 
          self.get('periodical').set('software', software.capitalize());
        }
      });
    } else {
      this.periodical.set('repository', null);
    }
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
    var softwares = softwareList.filter(function(software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.periodical.set('software', software);
    this.set('softwares', softwareList);
  },
  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new(model) {
      let provider = this.store.peekRecord('provider', model.periodicals.get('query.provider-id'));
      this.set('periodical', this.store.createRecord('periodical', { provider: provider, symbol: provider.id.toUpperCase() + '.' }));
      this.set('new', true);
    },
    searchRepository(query) {
      this.set('repositories', this.store.query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(periodical) {
      let self = this;
      periodical.save().then(function(periodical) {
        self.router.transitionTo('periodicals.show.settings', periodical.id);
        self.set('new', false);
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      this.periodical.rollbackAttributes();
      this.reset();
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
