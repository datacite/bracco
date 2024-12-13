// Finish conversion of this component to a @glimmer component.
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('span')
export default class SubjectLabel extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let text = this.tag.text;

    if (text.match(/^\d/)) {
      this.text = text.substr(text.indexOf(' ') + 1).toLowerCase();
    } else {
      this.text = text.toLowerCase();
    }
  }
}
