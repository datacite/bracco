import Ember from 'ember';
import HtmlEntities from 'npm:html-entities';
import SanitizeHtml from 'npm:sanitize-html';

const Entities = HtmlEntities.AllHtmlEntities;
const entities = new Entities();

// sanitize and truncate text
export function formatText([text], hash) {
  if (Ember.typeOf(text) === 'array') {
    if (text[0] && text[0].descriptionType) {
      text = text[0].description;
    } else if (text[0]) {
      text = text[0].title;
    }
  }
  text = entities.decode(text);
  
  let allowedTags = ['strong', 'em', 'b', 'i', 'code', 'pre', 'sub', 'sup', 'br']
  let sanitizedText = SanitizeHtml(text, { allowedTags: allowedTags });
  let words = sanitizedText.split(" ");
  let len = hash.limit || 500;
  let out = '';

  if (words) {
    out = words.splice(0, len).join(" ")

    if (words.length > len) {
      out += ' …';
    }
  }

  return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(formatText);
