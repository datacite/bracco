import Service from '@ember/service';
import ENV from 'bracco/config/environment';
import environment from 'config/environment';
import fetch from 'fetch';

export default Service.extend({

  init() {
    this._super(...arguments);
    this.min = 50;
    this.msg_zero = "There are 0 prefixes available. Request new prefixes from CNRI.";
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
              // ENV.PREFIXES_AVAILABLE only for development/staging/testing.
              let total = json.meta.total;
              // let total = 0;
              //if (ENV.PREFIXES_AVAILABLE !== null) {
              //  total = ENV.PREFIXES_AVAILABLE;
              //}
              console.log("Prefixes available = " + total);
              resolve(total);
              // resolve(0);
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
              // ENV.PREFIXES_AVAILABLE only for development/staging/testing.
              let total = json.meta.total;
              // let total = 0;
              //if (ENV.PREFIXES_AVAILABLE !== null) {
              //  total = ENV.PREFIXES_AVAILABLE;
              //}
              console.log("Provider prefixes available = " + total);
              resolve(total);
              // resolve(0);
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
  async available(provider_id = null) {
    let m = 0;

    if (provider_id) {
      m = await this.get_n_available_pp(provider_id);
      console.log("PREFIXES.AVAILABLE() - AWAITING M!! " + m);
      console.log("PREFIXES.AVAILABLE() - PROVIDER PREFIXES AVAILABLE FOR " + provider_id + ' = ' + m);
      console.log("PREFIXES.AVAILABLE() M = " + m);
    } else {
      console.log("PREFIXES.AVAILABLE() - NO PROVIDER ID PROVIDED!!")
    }

    let n = await this.get_n_available();
    console.log("N = " + n);
    console.log("PREFIXES.AVAILABLE() - PROVIDER_ID - AVAILABLE: " + provider_id);
    //return await this.get_n_available();
    let o = m + n;
    console.log('PREFIXES.AVAILABLE() - RETURNING M+N: ' + o);
    return m+n;
    //return 0;
  }
})
