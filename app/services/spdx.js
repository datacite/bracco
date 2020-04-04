import Service from '@ember/service';
import fetch from 'fetch';
import { A } from '@ember/array';


const spdxUrl = 'https://gitlab.com/gitlab-org/security-products/license-management/-/raw/master/spdx-licenses.json';

export default Service.extend({
  spdxList: A([]),
  init() {
    this._super(...arguments);
    this.getSpdxList();
  },
  getSpdxList() {
    let self = this;
    let url = spdxUrl;
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.set('spdxList', data.licenses);
          return (data);
        });
      } else {
        console.debug(response);
      }
    }).catch(function(error) {
      console.debug(error);
    });
  },
});
