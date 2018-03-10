import Ember from 'ember';
import moment from 'moment';

export function formatMetadata([publicationYear], hash) {
  var timestamp = new Date(Date.parse(publicationYear));
  let pubDate = moment(timestamp).utc().format('Y');
  let version = hash.version ? 'Version ' + hash.version + ' of ' : '';
  let resourceType = (hash.resourceTypeSubtype || (hash.resourceType && hash.resourceType.name) || 'Work').capitalize();
  let publisher = hash.publisher ? " via " + hash.publisher : '';
  return [version, resourceType, "published", pubDate, publisher].join(" ")
}

export default Ember.Helper.helper(formatMetadata);
