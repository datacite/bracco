import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiSize extends Component {
  @action
  updateSize(value) {
    this.set('fragment', value);
  }

  @action
  selectSize() {
    this.model.get('sizes').splice(this.index, 1, this.fragment);
    this.model.set('sizes', Array.from(this.model.get('sizes')));
  }

  @action
  deleteSize() {
    this.model.get('sizes').splice(this.index, 1);
    this.model.set('sizes', Array.from(this.model.get('sizes')));
  }
}
