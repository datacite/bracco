// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class DoiTitles extends Component {
  showTitles = true;

  constructor(...args) {
    super(...args);

    schedule("afterRender",this,function() {
      if (this.model.titles.length == 0) {
        this.send("addTitle");
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.titles) {
      this.model.titles = [];
    }
  }

  @action
  addTitle() {
    this.model.titles.createFragment();
    this.set('showTitles', true);
  }

  @action
  toggleTitles() {
    this.set('showTitles', !this.showTitles);
  }
}
