import Ember from 'ember';

export function formatMetadata([publicationYear], hash) {
  let published = publicationYear ? " published " + publicationYear : '';
  let version = hash.version ? 'Version ' + hash.version + ' of ' : '';
  let resourceType = hash.resourceType || hash.resourceTypeGeneral || 'Work';
  let publisher = hash.publisher ? " via " + hash.publisher : '';
  return [version, resourceType, published, publisher].join(" ")
}

export default Ember.Helper.helper(formatMetadata);
