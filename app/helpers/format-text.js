import Ember from 'ember';
import SanitizeHtml from 'npm:sanitize-html';

// sanitize and truncate text
export function formatText([text], hash) {
  if (Ember.typeOf(text) === 'object') {
    text = text.text;
  }
  let allowedTags = ['strong', 'em', 'b', 'i', 'code', 'pre', 'sub', 'sup', 'br']
  let sanitizedText = SanitizeHtml(text, { allowedTags: allowedTags });
  let words = sanitizedText.split(" ");
  let len = hash.limit || 300;
  let out = '';

  if (words) {
    out = words.splice(0, len).join(" ")

    if (words.length > len) {
      out += ' …';
    }

  } else {
    out = '';
  }

  return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(formatText);
