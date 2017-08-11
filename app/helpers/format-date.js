import Ember from 'ember';
import moment from 'moment';

export function formatDate([date]) {
  return moment(date).utc().format('D MMM Y H:MM UTC');
}

export default Ember.Helper.helper(formatDate);
