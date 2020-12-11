import { helper } from '@ember/component/helper';
import ENV from 'bracco/config/environment';

export function contentNegotiationUrl([hash]) {
  let mimeType = '';
  switch (hash.format) {
    case 'datacite':
      mimeType = 'application/vnd.datacite.datacite+xml';
      break;
    case 'datacite_json':
      mimeType = 'application/vnd.datacite.datacite+json';
      break;
    case 'crosscite_json':
      mimeType = 'application/vnd.crosscite.crosscite+json';
      break;
    case 'schema_org':
      mimeType = 'application/vnd.schemaorg.ld+json';
      break;
    case 'codemeta':
      mimeType = 'application/vnd.codemeta.ld+json';
      break;
    case 'citeproc':
      mimeType = 'application/vnd.citationstyles.csl+json';
      break;
    case 'jats':
      mimeType = 'application/vnd.jats+xml';
      break;
    case 'bibtex':
      mimeType = 'application/x-bibtex';
      break;
    case 'ris':
      mimeType = 'application/x-research-info-systems';
      break;
    default:
      mimeType = 'application/vnd.schemaorg.ld+json';
  }

  return ENV.API_URL + '/dois/' + mimeType + '/' + hash.doi;
}

export default helper(contentNegotiationUrl);
