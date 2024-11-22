// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class DoiCreators extends Component {
  @tracked showCreators = true;

  constructor(...args) {
    super(...args);

    schedule("afterRender",this,function() {
      if (!this.model.creators) {
        this.model.creators = [];
      }

      if (this.model.creators.length == 0) {
        this.send("addCreator");
      }
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

     if (!this.model.creators) {
      this.model.creators = [];
    }
  }

  @action
  addCreator() {
    this.model.creators.createFragment({ nameIdentifiers: [], affiliation: [] });
    this.model.creators.lastObject.nameIdentifiers.createFragment();
    this.model.creators.lastObject.affiliation.createFragment();
    this.showCreators = true;
  }

  @action
  toggleCreators() {
    this.showCreators = !this.showCreators;
  }
}
