import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';

@classic
export default class DoiCreators extends Component {
  showCreators = true;

  init() {
    super.init();

    schedule("afterRender",this,function() {
      if (!this.model.get('creators')) {
        this.model.set('creators', []);
      }

      if (this.model.get('creators').length == 0) {
        this.send("addCreator");
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

     if (!this.model.get('creators')) {
      this.model.set('creators', []);
    }
  }

  @action
  addCreator() {
    this.model
      .get('creators')
      .createFragment({ nameIdentifiers: [], affiliation: [] });
    this.model
      .get('creators')
      .get('lastObject')
      .get('nameIdentifiers')
      .createFragment();
    this.model
      .get('creators')
      .get('lastObject')
      .get('affiliation')
      .createFragment();
    this.set('showCreators', true);
  }

  @action
  toggleCreators() {
    this.set('showCreators', !this.showCreators);
  }
}
