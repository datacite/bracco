import mime from 'mime/lite';

export function ianaNameFromTemplate(template, hash) {
  var ret = template;

  if (template && mime.getExtension(template)) {
    ret = mime.getExtension(template);
  }

  return ret;
}
