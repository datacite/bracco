import Component from '@ember/component';

export default class CreatorShowComponent extends Component {
  didReceiveAttrs() {
super.didReceiveAttrs();
    super.didReceiveAttrs(...arguments);

    if (this.creators.length > 50) {
      let creators = this.creators.slice(0, 49);
      this.set('creators', creators);
    }
  }
}
