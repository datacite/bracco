// Finish conversion of this component to a @glimmer component.
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
@tagName('li')
export default class MenuLinks extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.set('navmenuTitle', ENV.NAVMENU_TITLE);
  }
}
