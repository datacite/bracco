import Service from '@ember/service';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

export default Service.extend({

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
              // resolve(json.meta.total);
              // For testing in development:
               resolve(0);
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
  available() {
    return this.get_n_available();
  }

});
