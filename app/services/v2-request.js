import RequestManager from '@ember-data-mirror/request';
import Fetch from '@ember-data-mirror/request/fetch';
import Auth from 'app/services/auth-handler';

const handler = {
  async request(context, next) {
    const { request } = context;

    console.log("GOT HERE - REQUEST MANAGER!!")

    const updatedRequest = Object.assign({}, request, {
      url: request.url + '&affiliation=true&publisher=true'
    });

    let ret = await next(updatedRequest);

    console.log('GOT HERE - in the request handler for v2Request')
    console.log(ret)

    return ret;
  }
};

export default class extends RequestManager {
  constructor(createArgs) {
    super(createArgs);
    this.use([handler, Fetch]);
  }
}
