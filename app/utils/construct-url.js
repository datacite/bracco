import ENV from 'bracco/config/environment';
import URI from 'urijs';

export default function constructUrl(baseURLIn, pathIn, idIn, queryParamsIn) {
  let ret = '';

  let baseUrl = baseURLIn || ENV.API_URL;
  let path = pathIn ? pathIn : '';
  let id = idIn ? encodeURIComponent(idIn.toLowerCase()) : '';
  let params = queryParamsIn ? queryParamsIn : {};

  let ordered = {};
  Object.keys(queryParamsIn)
    .sort()
    .forEach(function (key) {
      ordered[key] = params[key];
    });

  // Build the URL
  // let url = new URI(baseUrl + '/' + path + '/' + id);
  var url = new URI(baseUrl + '/' + path + '/' + id);

  // Add query parameters
  for (const key in ordered) {
    //url.searchParams.append(key, params[key]);
    url.addQuery(key, params[key]);
  }

  // Get the final URL string
  ret = url.toString();

  return ret;
}
