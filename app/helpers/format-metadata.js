import Ember from 'ember';
import { isPresent } from '@ember/utils';

export function formatMetadata([publicationYear], hash) {
  let published = publicationYear ? " published " + publicationYear : '';
  let version = hash.version ? 'Version ' + hash.version + ' of ' : '';
  let resourceType = hash.resourceType || hash.resourceTypeGeneral || isPresent(published) ? 'Work' : '';
  let publisher = hash.publisher ? " via " + hash.publisher : '';
  let metadata = [version, resourceType, published, publisher].join(" ").trim();
  if (isPresent(metadata)) {
    return metadata;
  } else {
    return null;
  }
}

export default Ember.Helper.helper(formatMetadata);
