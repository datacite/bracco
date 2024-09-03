import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class UrlCheck extends Component {
  @service
  currentUser;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.set('url', this.url);
  }
}
