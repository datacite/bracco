// Finish conversion of this component to a @glimmer component.
import { classNames, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

@tagName('div')
@classNames('row')
export default class DoiList extends Component {
  @service
  can;

  @computed('data', 'link')
  get isResearcherProfile() {
    if (this.data == undefined) {
      return false;
    }
    if (this.link == 'users.show.dois') {
      return true;
    } else {
      return false;
    }
  }
}
