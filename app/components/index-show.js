// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class IndexShow extends Component {
  @service
  store;

  edit = false;
  provider = null;

  @action
  editAction(provider) {
    this.provider = provider;
    this.edit = true;
  }

  @action
  submitAction() {
    this.provider.save();
    this.edit = false;
  }

  @action
  cancelAction() {
    this.edit = false;
  }
}
