// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class DoiFormats extends Component {
  @tracked showFormats = false;

  constructor(...args) {
    super(...arguments);

    schedule("afterRender",this,function() {
      if (!this.model.formats) {
        this.model.formats = [];
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

  }

  @action
  addFormat() {
    this.model.formats.push('');
    this.model.formats = Array.from(this.model.formats);
    this.showFormats = true;
  }

  @action
  toggleFormats() {
    this.showFormats = !this.showFormats;
  }
}
