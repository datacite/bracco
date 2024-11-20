import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray, fragment } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

const Validations = buildValidations({
  relatedItemType: [
    validator('presence', {
      presence: true,
      message: 'Please enter a Related Item Type for the Related Item.',
      disabled: computed('model.{title,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('title'))
        );
      })
    })
  ],
  relationType: [
    validator('presence', {
      presence: true,
      message: 'Please enter a Relation Type for the Related Item.',
      disabled: computed('model.{title,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('title'))
        );
      })
    })
  ],
  title: [
    validator('presence', {
      presence: true,
      message: 'Related Item must have a Title',
      disabled: computed(
        'model.{title,relatedItemType,relationType,state}',
        function () {
          return (
            this.model.get('state') === 'draft' ||
            (isBlank(this.model.get('title')) &&
              isBlank(this.model.get('relatedItemType')) &&
              isBlank(this.model.get('relationType')))
          );
        }
      )
    })
  ],
  publicationYear: [
    validator('date-format', {
      allowBlank: true,
      disabled: computed('model.{title,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('title'))
        );
      })
    })
  ],
  relatedItemContributors: [
   validator('inline',
      {
        validate () {
          let valid = true;
          this.model.get('contributors').forEach((element) => {
            const { validations } = element.validateSync();
            valid = validations.get('isValid');
          });
          return valid;
        },
        dependentKeys: [
          'model.contributors.@each.name',
          'model.contributors.@each.contributorType'
        ],
        attributeDescription: 'Related Items Contributors',
        disabled: computed('model.{title,state}', function () {
          return (
            this.model.get('state') === 'draft' ||
            isBlank(this.model.get('title'))
          );
        })
      }
    )
  ]
});

export default class RelatedItem extends Fragment.extend(Validations) {
  @attr('string', { defaultValue: null })
  relatedItemType;

  @attr('string', { defaultValue: null })
  relationType;

  @fragment('related-item-identifier', {
    defaultValue: {}
  })
  relatedItemIdentifier;

  @fragmentArray('related-item-creator', { defaultValue: [] })
  creators;

  @fragmentArray('title', { defaultValue: [] })
  titles;

  @attr('string', { defaultValue: null })
  volume;

  @attr('string', { defaultValue: null })
  issue;

  @attr()
  number;

  @attr('string', { defaultValue: null })
  publicationYear;

  @fragmentArray('related-item-contributor', { defaultValue: [] })
  contributors;

  @attr('string', { defaultValue: null })
  firstPage;

  @attr('string', { defaultValue: null })
  lastPage;

  @fragment('publisher')
  publisher;

  @attr('string', { defaultValue: null })
  edition;

  @computed('titles.@each.title')
  get title() {
    if (this.titles.length > 0) {
      return A(this.titles).get('firstObject').title;
    } else {
      return null;
    }
  }

  @reads('contributors')
  relatedItemContributors;
}
