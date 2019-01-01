import Component from '@ember/component';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    let errors = this.model.get('validations.errors');

    if (errors.length > 0) {
      errors.forEach((item) => {
        if (console.debug) {
          console.debug(item);
        } else {
          console.log(item);
        }
      });
    }
  }
});
