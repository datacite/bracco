import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import HtmlEntities from 'html-entities';
import truncate from 'lodash/truncate';
import SanitizeHtml from 'sanitize-html';

const Entities = HtmlEntities.AllHtmlEntities;
const entities = new Entities();

// sanitize and truncate text
export function formatText([text]) {
  text = entities.decode(text);

  let allowedTags = [
    'strong',
    'em',
    'b',
    'i',
    'code',
    'pre',
    'sub',
    'sup',
    'br'
  ];
  let sanitizedText = SanitizeHtml(text, { allowedTags });
  let out = truncate(sanitizedText, {
    length: 2500,
    separator: '… '
  });

  return htmlSafe(out);
}

export default buildHelper(formatText);
