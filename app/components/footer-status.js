/* global StatusPage*/

import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (typeof StatusPage !== 'undefined') {
      let sp = new StatusPage.page({ page: 'nmtzsv0smzk5' });
      let self = this;

      sp.summary({
        success(data) {
          self.element.querySelector('.color-description').textContent =
            data.status.description;
          self.element
            .querySelector('.color-dot')
            .classList.add(data.status.indicator);
        }
      });
    }
  }
});
