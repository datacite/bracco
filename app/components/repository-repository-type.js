// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

const repositoryTypeList = [
  'disciplinary',
  'governmental',
  'institutional',
  'multidisciplinary',
  'project-related',
  'other'
];

export default class RepositoryRepositoryType extends Component {
  @service
  store;

  repositoryType = null;
  repositoryTypeList = repositoryTypeList;
  repositoryTypes = repositoryTypeList;

  @action
  searchRepositoryType(query) {
    let repositoryTypes = repositoryTypeList.filter(function (
      repositoryType
    ) {
      return repositoryType.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('repositoryTypes', repositoryTypes);
  }

  @action
  selectRepositoryType(repositoryType) {
    this.model.repositoryType.replace(this.index, 1, [repositoryType]);
    this.set('repositoryTypes', repositoryTypeList);
    this.model.certifyDisciplinaryRepository();
  }

  @action
  deleteRepositoryType() {
    this.model.get('repositoryType').removeAt(this.index);
    this.model.certifyDisciplinaryRepository();
  }
}
