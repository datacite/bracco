import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

const repositoryTypeList = [
  'disciplinary',
  'governmental',
  'institutional',
  'multidisciplinary',
  'project-related',
  'other'
];

@classic
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
    this.model.get('repositoryType').replace(this.index, 1, [repositoryType]);
    this.set('repositoryTypes', repositoryTypeList);
    this.model.certifyDisciplinaryRepository();
  }

  @action
  deleteRepositoryType() {
    this.model.get('repositoryType').removeAt(this.index);
    this.model.certifyDisciplinaryRepository();
  }
}
