import Model, { attr } from '@ember-data/model';
import { union } from '@ember/object/computed';
import { reads } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';
import dfgMapping from '../utils/dfg-mappings';

const Validations = buildValidations({
  name: validator('presence', true),
  repositoryUrl: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false
    })
  ]
});

export default Model.extend(Validations, {
  re3dataId: attr('string'),
  repositoryName: attr('string'),
  additionalNames: attr(),
  description: attr('string'),
  repositoryUrl: attr('string'),
  repositoryContacts: attr(),
  repositoryLanguages: attr(),
  software: attr(),
  subjects: attr(),
  certificates: attr(),
  dataUploads: attr(),
  dataAccesses: attr(),
  types: attr(),
  created: attr('date'),
  updated: attr('date'),

  name: reads('repositoryName'),

  // combine subject areas and keywords
  tags: union('subjects', 'keywords'),

  get reformattedSubjects() {
    return this.subjects.map( (sub) => {
      var [code, ...rest] = sub.text.split(" ");
      return {
        classificationCode: code,
        subject: rest.join(" "),
        scheme: sub.scheme
      };
    });
  },
  get fosSubjects() {
    if (this.subjects.length > 1) {
      return []
    }
    var subjects = this.subjects.filter( (sub) => {
      return sub.scheme == "DFG";
    });

    var ids = subjects.map( (sub) => {
      var [code] = sub.text.split(" ",1);
      return code;
    });

    return dfgMapping.findByIds(ids);
  }
});
