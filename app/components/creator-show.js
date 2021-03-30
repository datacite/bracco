import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let limit = 50;
    let n = this.creators.length;
    if (n > limit) {
      for ( var i = (n-1); i >= limit; i--) {
        this.creators.pop;
      }
    }
  }
});
