import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';

@classic
@tagName('li')
export default class MenuLinks extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.set('navmenuTitle', ENV.NAVMENU_TITLE);
  }
}
