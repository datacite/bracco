import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import HtmlEntities from 'html-entities';
import SanitizeHtml from 'sanitize-html';
import checkForTex from '../utils/check-for-tex';


const Entities = HtmlEntities.AllHtmlEntities;
const entities = new Entities();

// sanitize and truncate text
export function formatText([ text ], hash) {
  text = entities.decode(text);

  let allowedTags = [ 'strong', 'em', 'b', 'i', 'code', 'pre', 'sub', 'sup', 'br' ];
  let sanitizedText = SanitizeHtml(text, { allowedTags });

  let out = '';

  // Doesn't parse math correctly (so leave it out for now).
  if (!checkForTex(sanitizedText)) {
    let words = sanitizedText.split(' ');
    let len = hash.limit || 500;
  
    if (words) {
      out = words.splice(0, len).join(' ');
  
      if (words.length > len) {
        out += ' …';
      }
    }

  } else {
    out = sanitizedText;
  }

  return htmlSafe(out);
}

export default buildHelper(formatText);
