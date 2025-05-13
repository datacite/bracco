import RequestManager from '@ember-data-mirror/request';
import { CacheHandler } from '@ember-data-mirror/store';
import { inject as service } from '@ember/service';
import { buildBaseURL, buildQueryParams } from '@ember-data-mirror/request-utils';
import ENV from 'bracco/config/environment';
import printObjectLiteral from 'bracco/utils/print-object-literal';
import { findRecord } from '@ember-data-mirror/rest/request';

// Custom handler to show how to use a custom fetch implementation.
const RESTHandler = {
  /*
  async request(context) {
    // Build the request URL following Request API.
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/', { 
      method: 'GET'
    });
    context.setResponse(response);
    context.setStream(response.clone().body);
    return response.json();
  },

  */
  async request(context) {

    console.log("GOT HERE - simple search params 1111 - begin")
    console.log(buildQueryParams({ name: 'Chris', include:['pets'] }))
    console.log("GOT HERE - simple search params 1111 - end")

    console.log("GOT HERE - simple search params 2222- begin")
    const obj = { name: 'Chris', include:['pets'] };
    console.log(buildQueryParams(obj))
    console.log("GOT HERE - simple search params 2222- middle")
    const obj1 = { name: 'Chris', include:['dogs', 'cats', 'elephants'] };
    console.log(buildQueryParams(obj1))
    console.log("GOT HERE - simple search params 2222- end")

    const plain = JSON.parse(JSON.stringify(context.request.data))
    console.log(buildQueryParams(plain))

    const baseURL = buildBaseURL({
      host: ENV.API_URL,
      namespace: '',
      resourcePath: 'dois',
      op: 'query',
      identifier: { type: 'ember-developer' }
    });

    const url = `${baseURL}?${buildQueryParams(plain)}`;
    console.log(url)

   // debugger

    console.log("GOT HERE - Done with params!")

    // debugger

    /*
    const baseURL = buildBaseURL({
      host: ENV.API_URL,
      namespace: '',
      resourcePath: 'dois',
      op: 'query',
      identifier: { type: 'ember-developer' }
    });
    console.log("GOT HERE!!!! WORKING ON PARAMETERS")
    // debugger
    let params = requestInfo.request.data;
    let params_1 = buildQueryParams(params)
    console.log("PARAMS ARE HERE!!")
    console.log(params)
    console.log(params_1)
    // debugger
    //const options = findRecord('dois', '1', requestInfo.request.data);
    //const queryParams = buildQueryParams(requestInfo.request.data);
    //const queryParams = buildQueryParams(printObjectLiteral(requestInfo.request.data));
    //const url = `${ENV.API_URL}?${buildQueryParams({ name: 'Chris', include:['pets', 'dogs'] })}`;
    //const url = `${baseURL}?${buildQueryParams({ name: 'Chris', include:['pets', 'dogs'] })}`;
    //const url = `${baseURL}?${queryParams}`;

    //console.log("GOT HERE!!!! STARTING REQUEST")
    //debugger
    // Build the request URL following Request API.
    //const response = await fetch(url, { 
    //  method: 'GET'
    //});
    //context.setResponse(response);
    //context.setStream(response.clone().body);
    //return response.json();
    */
  }
};

export default class v2RequestService extends RequestManager {
  @service
  v2Store;

  constructor(createArgs) {
    super(createArgs);

    console.log("GOT HERE!!!! CONSTRUCTING V2REQUESTSERVICE")

    // Specify which handler to use to fullfill requests.
    this.use([RESTHandler]);

    console.log("GOT HERE!!!! CONSTRUCTING V2REQUESTSERVICE 2222")

    // Specify which cache handler to use to cache responses.
    this.useCache([this.v2Store.CacheHandler]);

    console.log("GOT HERE!!!! CONSTRUCTING V2REQUESTSERVICE 3333")
  }
}
