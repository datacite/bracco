import Ember from 'ember';
import moment from 'moment';

export function formatMetadata([published], hash) {
  let pubDate = '';
  if (published) {
    var timestamp = new Date(Date.parse(published));
    pubDate = "published " + moment(timestamp).utc().format('Y');
  }
  let version = hash.version ? 'Version ' + hash.version + ' of ' : '';
  let resourceType = (hash.resourceTypeSubtype || (hash.resourceType && hash.resourceType.name) || 'Work').capitalize();
  let publisher = hash.publisher ? " via " + hash.publisher : '';
  return [version, resourceType, pubDate, publisher].join(" ")
}

export default Ember.Helper.helper(formatMetadata);
