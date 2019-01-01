import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import { typeOf } from '@ember/utils';
import HtmlEntities from 'html-entities';
import SanitizeHtml from 'sanitize-html';

const Entities = HtmlEntities.AllHtmlEntities;
const entities = new Entities();

// sanitize and truncate text
export function formatText([text], hash) {
  if (typeOf(text) === 'array') {
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

  return htmlSafe(out);
}

export default buildHelper(formatText);
