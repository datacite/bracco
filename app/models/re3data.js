import { reads, union } from '@ember/object/computed';
import Model, { attr } from '@ember-data/model';
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

export default class Re3Data extends Model.extend(Validations) {
  @attr('string')
  re3dataId;

  @attr('string')
  repositoryName;

  @attr()
  additionalNames;

  @attr('string')
  description;

  @attr('string')
  repositoryUrl;

  @attr()
  repositoryContacts;

  @attr()
  repositoryLanguages;

  @attr()
  software;

  @attr()
  subjects;

  @attr()
  certificates;

  @attr()
  dataUploads;

  @attr()
  dataAccesses;

  @attr()
  types;

  @attr('date')
  created;

  @attr('date')
  updated;

  @reads('repositoryName')
  name;

  // combine subject areas and keywords
  @union('subjects', 'keywords')
  tags;

  get reformattedSubjects() {
    return this.subjects.map((sub) => {
      var [code, ...rest] = sub.text.split(' ');
      return {
        classificationCode: code,
        subject: rest.join(' '),
        scheme: sub.scheme
      };
    });
  }

  get fosSubjects() {
    var subjects = this.subjects.filter((sub) => {
      return sub.scheme == 'DFG';
    });

    var ids = subjects.map((sub) => {
      var [code] = sub.text.split(' ', 1);
      return code;
    });

    return dfgMapping.findByIds(ids);
  }
}
