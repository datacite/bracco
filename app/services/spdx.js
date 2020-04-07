import Service from '@ember/service';
import fetch from 'fetch';
import { A } from '@ember/array';

// // original file with CORS fix https://gitlab.com/gitlab-org/security-products/license-management/-/raw/master/spdx-licenses.json
const spdxUrl = 'https://glcdn.githack.com/gitlab-org/security-products/license-management/-/raw/master/spdx-licenses.json';

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
        self.set('spdxList', response.json().then(function(data) {
          return (data.licenses);
        }));
      } else {
        console.debug(response);
      }
    }).catch(function(error) {
      console.debug(error);
    });
  },
});
