import mime from 'mime/lite';

export function ianaNameFromTemplate(template, hash) {
  var ret = template;

  if (template) {
    if (mime.getExtension(template)) {
      var parts = template.split("/");
      var name = parts.pop();
      if (name) {
        ret = name;
      }
    }
  }

  return ret;
}
