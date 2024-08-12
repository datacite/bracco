import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class IndexShow extends Component {
  @service
  store;

  edit = false;
  provider = null;

  @action
  editAction(provider) {
    this.set('provider', provider);
    this.set('edit', true);
  }

  @action
  submitAction() {
    this.provider.save();
    this.set('edit', false);
  }

  @action
  cancelAction() {
    this.set('edit', false);
  }
}
