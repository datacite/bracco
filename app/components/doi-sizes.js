// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class DoiSizes extends Component {
  showSizes = false;

  constructor() {
    super(...arguments);

    schedule("afterRender",this,function() {
      if (!this.model.sizes) {
        this.model.sizes = [];
      }
    });
  }

  @action
  addSize() {
    this.model.sizes.push('');
    this.model.sizes = Array.from(this.model.sizes);
    this.set('showSizes', true);
  }

  @action
  toggleSizes() {
    this.set('showSizes', !this.showSizes);
  }
}
