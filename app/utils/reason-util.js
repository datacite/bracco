import isEmpty from '../utils/is-empty';

export default function reasonUtil(val = null, hash = { default: '' }) {
  let ret = hash.default;

  if (val) {
    if (typeof val === 'object') {
      if (
        val.responseJSON &&
        val.responseJSON.errors &&
        Array.isArray(val.responseJSON.errors) &&
        val.responseJSON.errors.length > 0 &&
        val.responseJSON.errors[0].title
      ) {
        ret = !isEmpty(val.responseJSON.errors[0].title) ? val.responseJSON.errors[0].title : hash.default;
      } else if (
        val.errors &&
        Array.isArray(val.errors) &&
        val.errors.length > 0 &&
        val.errors[0].title
      ) {
        ret = !isEmpty(val.errors[0].title) ? val.errors[0].title : hash.default;
      } else {
        ret = hash.default;
      }
    } else if (typeof val === 'string' && !isEmpty(val)) {
      ret = val;
    } else {
      ret = hash.default;
    }
  }

  return ret;
}
