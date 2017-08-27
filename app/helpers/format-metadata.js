import Ember from 'ember';
import moment from 'moment';

export function formatMetadata([published], hash) {
  var timestamp = new Date(Date.parse(published));
  let pubDate = '';

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

  let resourceType = (hash.resourceTypeSubtype || hash.resourceTypeId || 'Work').capitalize();
  let containerTitle = hash.containerTitle ? " via " + hash.containerTitle : '';
  return [resourceType, "published", pubDate, containerTitle].join(" ")
}

export default Ember.Helper.helper(formatMetadata);
