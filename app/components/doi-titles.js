import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';

@classic
export default class DoiTitles extends Component {
  showTitles = true;

  init() {
    super.init();

    schedule("afterRender",this,function() {
      if (this.model.get('titles').length == 0) {
        this.send("addTitle");
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('titles')) {
      this.model.set('titles', []);
    }
  }

  @action
  addTitle() {
    this.model.get('titles').createFragment();
    this.set('showTitles', true);
  }

  @action
  toggleTitles() {
    this.set('showTitles', !this.showTitles);
  }
}
