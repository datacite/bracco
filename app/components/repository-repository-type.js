import Component from '@ember/component';
import { inject as service } from '@ember/service';

const repositoryTypeList = [
  'disciplinary',
  'governmental',
  'institutional',
  'multidisciplinary',
  'project-related',
  'other',
];

export default Component.extend({
  store: service(),

  repositoryType: null,
  repositoryTypeList,
  repositoryTypes: repositoryTypeList,

  actions: {
    searchRepositoryType(query) {
      let repositoryTypes = repositoryTypeList.filter(function(repositoryType) {
        return repositoryType.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('repositoryTypes', repositoryTypes);
    },
    selectRepositoryType(repositoryType) {
      this.model.get('repositoryType').replace(this.index, 1, [ repositoryType ]);
      this.set('repositoryTypes', repositoryTypeList);
    },
    deleteRepositoryType() {
      this.model.get('repositoryType').removeAt(this.index);
    },
  },
});
