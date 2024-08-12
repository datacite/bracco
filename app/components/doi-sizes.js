import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';

@classic
export default class DoiSizes extends Component {
  showSizes = false;

  init() {
    super.init();

    schedule("afterRender",this,function() {
      if (!this.model.get('sizes')) {
        this.model.set('sizes', []);
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }

  @action
  addSize() {
    this.model.get('sizes').push('');
    this.model.set('sizes', Array.from(this.model.get('sizes')));
    this.set('showSizes', true);
  }

  @action
  toggleSizes() {
    this.set('showSizes', !this.showSizes);
  }
}
