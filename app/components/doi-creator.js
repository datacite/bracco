// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import PersonBaseComponent from './person-base-component';
import { tracked } from '@glimmer/tracking';

export default class DoiCreator extends PersonBaseComponent {
  @action
  deleteCreator() {
    this.model.creators.removeObject(this.fragment);
  }
}
