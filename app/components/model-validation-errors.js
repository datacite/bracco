import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.model.get('state') !== 'draft') {
      let errors = this.model.get('validations.errors');

      if (errors.length > 0) {
        A(errors).forEach((item) => {
          console.log(item);
        });
      }
    }
  },
});
