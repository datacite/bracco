import { helper as buildHelper } from '@ember/component/helper';
import startCase from 'lodash/startCase';

export function formatMetadata([metadata]) {
  let version = metadata.version ? 'Version ' + metadata.version + ' of ' : '';
  let resourceType = startCase(
    metadata.resourceType || metadata.resourceTypeGeneral || 'Work'
  );
  let published = metadata.publicationYear
    ? ' published ' + metadata.publicationYear
    : '';
  let container = '';
  if (metadata.container && metadata.container.title) {
    container = ' via ' + metadata.container.title;
  } else if (metadata.publisher) {
    container = ' via ' + metadata.publisher;
  }
  let formatted = [version, resourceType, published, container]
    .join(' ')
    .trim();

  return formatted;
}

export default buildHelper(formatMetadata);
