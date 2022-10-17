import { helper as buildHelper } from '@ember/component/helper';
import ENV from 'bracco/config/environment';

export function exportBasicMetadataUrl([ id, routeInfo ]) {
  let query = '';

  if (id !== undefined) {
    if (routeInfo.name.startsWith("repositories")) {
      query = "client-id=" + id
    } else if (routeInfo.name.startsWith("providers")) {
      query = "provider-id" + id
    }
  }

  if ('sort' in routeInfo.queryParams) {
    query = query + (query ? '&' : '') + 'sort=' + routeInfo.queryParams['sort'];
  }

  if ('page' in routeInfo.queryParams) {
    query = query + (query ? '&' : '') + 'page=' + routeInfo.queryParams['page'];
  } else if ('page[number]' in routeInfo.queryParams) {
    query = query + (query ? '&' : '') + 'page[number]=' + routeInfo.queryParams['page[number]'];
  } else {
    query = query + (query? '&' : '') + 'page=1';
  }

  if ('size' in routeInfo.queryParams) {
    query = query + (query ? '&' : '') + 'size=' + routeInfo.queryParams['size'];
  }   

  if ('page[size]' in routeInfo.queryParams) {
    query = query + (query ? '&' : '') + 'page[size]=' + routeInfo.queryParams['page[size]'];
  }   

  return ENV.API_URL + '/dois/text/csv' + (query ? '?' : '') + query;
}

export default buildHelper(exportBasicMetadataUrl);
