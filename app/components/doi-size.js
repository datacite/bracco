// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiSize extends Component {
  @action
  updateSize(value) {
    this.fragment = value;
  }

  @action
  selectSize() {
    this.model.sizes.splice(this.index, 1, this.fragment);
    this.model.sizes = Array.from(this.model.sizes);
  }

  @action
  deleteSize() {
    this.model.sizes.splice(this.index, 1);
    this.model.sizes = Array.from(this.model.sizes);
  }
}
