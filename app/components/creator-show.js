import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class CreatorShow extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }
}
