import Service from '@ember/service';
import ENV from 'bracco/config/environment';
import environment from 'config/environment';
import fetch from 'fetch';

export default Service.extend({

  init() {
    this._super(...arguments);
    this.min = ENV.MIN_PREFIXES_AVAILABLE || 50;
    this.msg_zero = "There are 0 prefixes available. Request new prefixes from CNRI.";
    this.msg_min = "There are fewer than " + this.min + " prefixes available. Contact CNRI and request more prefixes.";
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

  get_n_available_pp(provider_id = null) {
    let promise = new Promise((resolve, reject) => {
      const url = ENV.API_URL + '/provider-prefixes?provider-id=' + provider_id + '&page[number]=1&page[size]=0&state=without-repository';
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

  //// These return a promise.

  // Returns total available: pool prefixes + provider prefixes (0 if no provider_id given)
  async available(provider_id = null) {
    let m = 0;
    if (provider_id) {
      m = await this.get_n_available_pp(provider_id);
    }

    let n = await this.get_n_available();

    return m+n;
  },

  // Returns total available: provider prefixes
  async available_pp(provider_id = null) {
    let m = 0;
    if (provider_id) {
      m = await this.get_n_available_pp(provider_id);
    }

    return m;
  }
})
