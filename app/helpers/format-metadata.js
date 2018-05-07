import Ember from 'ember';
import moment from 'moment';

export function formatMetadata([published], hash) {
  let pubDate = '';

  if (published) {
    var timestamp = new Date(Date.parse(published));
    switch (published.length) {
      case 4:
        pubDate = moment(timestamp).utc().format('Y');
        break;
      case 7:
        pubDate = moment(timestamp).utc().format('MMM Y');
        break;
      case 10:
        pubDate = moment(timestamp).utc().format('D MMM Y');
        break;
      default:
        pubDate = moment(timestamp).utc().format('D MMM Y H:MM UTC');
    }
  }
  let version = hash.version ? 'Version ' + hash.version + ' of ' : '';
  let resourceType = (hash.resourceTypeSubtype || (hash.resourceType && hash.resourceType.name) || 'Work').capitalize();
  let publisher = hash.publisher ? " via " + hash.publisher : '';
  return [version, resourceType, pubDate, publisher].join(" ")
}

export default Ember.Helper.helper(formatMetadata);
