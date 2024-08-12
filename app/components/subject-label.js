import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('span')
export default class SubjectLabel extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let text = this.get('tag.text');

    if (text.match(/^\d/)) {
      this.set('text', text.substr(text.indexOf(' ') + 1).toLowerCase());
    } else {
      this.set('text', text.toLowerCase());
    }
  }
}
