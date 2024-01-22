import { helper as buildHelper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';
import _string from 'lodash/string';

export function formatMetadata([ publicationYear ], hash) {
  let container = '';
  if (hash.container && hash.container.title) {
    container = ' via ' + hash.container.title;
  } else if (hash.publisher && hash.publisher.name) {
    container = ' via ' + hash.publisher.name;
  }
  let published = publicationYear ? ' published ' + publicationYear : '';
  let version = hash.version ? 'Version ' + hash.version + ' of ' : '';
  let resourceType = _string.startCase(hash.resourceType || hash.resourceTypeGeneral || '');
  let metadata = [ version, resourceType, published, container ].join(' ').trim();

  if (isPresent(metadata)) {
    return metadata;
  } else {
    return null;
  }
}

export default buildHelper(formatMetadata);
