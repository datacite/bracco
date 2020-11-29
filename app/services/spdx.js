import Service from '@ember/service';
import { A } from '@ember/array';
import spdx from 'bracco/spdx';

export default Service.extend({
  spdxList: A([]),
  init() {
    this._super(...arguments);
    this.getSpdxList();
  },
  getSpdxList() {
    this.set('spdxList', spdx.licenses);
    return true;
  }
});
