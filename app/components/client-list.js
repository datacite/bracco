import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

const softwareList = [
  'CKAN',
  'Dataverse',
  'DSpace',
  'EPrints',
  'Fedora',
  'Invenio',
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
  availableClientCount: computed('model.provider', 'model.clients', function() {
    // if (this.model.provider && this.model.provider.memberType === 'contractual_provider') {
    //   return 1 - this.model.clients.length;
    // } else {
    //   return 500 - this.model.clients.length;
    // }
    return 1;
  }),

  selectRepository(repository) {
    if (repository) {
      let self = this;
      this.store.findRecord('repository', repository.id).then(function(repo) {
        self.set('repository', repo)
        self.get('client').set('repository', repo);
        self.get('client').set('name', repo.get('repositoryName'));
        self.get('client').set('description', repo.get('description'));
        self.get('client').set('url', repo.get('repositoryUrl'));
        if (repo.get('software').length > 0) {
          let software = repo.get('software')[0].name;
          if (software === "DataVerse") {
            software = "Dataverse";
          } 
          self.get('client').set('software', software.capitalize());
        }
      });
    } else {
      this.client.set('repository', null);
    }
  },
  searchSoftware(query) {
    var softwares = softwareList.filter(function(software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.client.set('software', software);
    this.set('softwares', softwareList);
  },
  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new(model) {
      let provider = this.store.peekRecord('provider', model.clients.get('query.provider-id'));
      this.set('client', this.store.createRecord('client', { provider: provider, symbol: provider.id.toUpperCase() + '.' }));
      this.set('new', true);
    },
    searchRepository(query) {
      this.set('repositories', this.store.query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(client) {
      let self = this;
      client.save().then(function(client) {
        self.router.transitionTo('clients.show.settings', client.id);
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
      this.client.rollbackAttributes();
      this.reset();
    },
    searchSoftware(query) {
      this.searchSoftware(query);
    },
    selectSoftware(software) {
      this.selectSoftware(software);
    }
  }
});
