import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';

@classic
export default class DoiFormats extends Component {
  showFormats = false;

  init() {
    super.init();

    schedule("afterRender",this,function() {
      if (!this.model.get('formats')) {
        this.model.set('formats', []);
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

  }

  @action
  addFormat() {
    this.model.get('formats').push('');
    this.model.set('formats', Array.from(this.model.get('formats')));
    this.set('showFormats', true);
  }

  @action
  toggleFormats() {
    this.set('showFormats', !this.showFormats);
  }
}
