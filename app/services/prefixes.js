import Service from '@ember/service';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

export default Service.extend({

  init() {
    this._super(...arguments);
    this.n = this.available();
    this.min = 50;
    this.msg_zero = "There are 0 prefixes available. Request new prefixes to CNRI.";
    this.msg_min = "There are fewer than 50 prefixes available. Contact CNRI and request more prefixes.";
  },

  get_n_available() {
    let promise = new Promise((resolve, reject) => {
      const url = ENV.API_URL + '/prefixes?page[number]=1&page[size]=0&state=unassigned';
      const headers = { 'Accept': 'application/json' };
      fetch(url, {
        headers,
      }).then((response) => {
        response.text().then((text) => {
          try {
            let json = JSON.parse(text);
            if (!response.ok) {
              response.responseJSON = json;
              reject(response);
            } else {
              resolve(json.meta.total);
              // For testing in development:
              // resolve(0);
              // resolve(30);
              // resolve(50);
            }
          } catch (SyntaxError) {
            response.responseText = text;
            reject(response);
          }
        });
      }).catch(reject);
    });

    return promise;
  },

  // Returns a promise.
  async available() {
    return await this.get_n_available();
  },

  async get_n() {
    let n = await this.available();
    return n;
  }
})
