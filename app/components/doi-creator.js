import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import PersonBaseComponent from './person-base-component';

@classic
export default class DoiCreator extends PersonBaseComponent {
  @action
  deleteCreator() {
    this.model.get('creators').removeObject(this.fragment);
  }
}
