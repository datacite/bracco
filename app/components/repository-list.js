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
  client: null,
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
      this.store.findRecord('re3data', repository.id).then(function(repo) {
        self.set('re3data_id', repo.id)
        self.get('repository').set('re3data_id', repo.id);
        self.get('repository').set('name', repo.get('repositoryName'));
        self.get('repository').set('description', repo.get('description'));
        self.get('repository').set('url', repo.get('repositoryUrl'));
        if (repo.get('software').length > 0) {
          let software = repo.get('software')[0].name;
          if (software === "DataVerse") {
            software = "Dataverse";
          } 
          self.get('repository').set('software', software.capitalize());
        }
      });
    } else {
      this.repository.set('repository', null);
    }
  },
  searchClientType(query) {
    var clientTypes = clientTypeList.filter(function(clientType) {
      return clientType.startsWith(query.toLowerCase());
    })
    this.set('clientTypes', clientTypes);
  },
  selectClientType(clientType) {
    this.repository.set('clientType', clientType);
    this.set('clientTypes', clientTypeList);
  },
  searchSoftware(query) {
    var softwares = softwareList.filter(function(software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.repository.set('software', software);
    this.set('softwares', softwareList);
  },
  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new(model) {
      let provider = this.store.peekRecord('provider', model.repositories.get('query.provider-id'));
      this.set('repository', this.store.createRecord('repository', { provider: provider, symbol: provider.id.toUpperCase() + '.' }));
      this.set('new', true);
    },
    searchRepository(query) {
      this.set('repositories', this.store.query('re3data', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(repository) {
      let self = this;
      repository.save().then(function(repository) {
        self.router.transitionTo('repositories.show.settings', repository.id);
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
      this.repository.rollbackAttributes();
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
