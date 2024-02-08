import { reads } from '@ember/object/computed';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray, fragment } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

const Validations = buildValidations({
  relatedItemType: [
    validator('presence', {
      presence: true,
      message:
        'Please enter a Related Item Type for the Related Item.',
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
      disabled: computed('model.{title,relatedItemType,relationType,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          (isBlank(this.model.get('title')) &&
          isBlank(this.model.get('relatedItemType')) &&
          isBlank(this.model.get('relationType')))
        );
      })
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
    validator(function() {
      let valid = true
      this.model.get('contributors').forEach(element => {
        const {validations} = element.validateSync();
        valid = validations.get('isValid')
      });
      return valid;
    },
    {
      dependentKeys: ['model.contributors.@each.name', 'model.contributors.@each.contributorType'],
      attributeDescription: 'Related Items Contributors',
      disabled: computed('model.{title,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('title'))
        );
      })
    }
    ),
  ],
});


export default Fragment.extend(Validations, {
  relatedItemType: attr('string', { defaultValue: null }),
  relationType: attr('string', { defaultValue: null }),
  relatedItemIdentifier: fragment('related-item-identifier', { defaultValue: {} }),
  creators: fragmentArray('related-item-creator', { defaultValue: [] }),
  titles: fragmentArray('title', { defaultValue: [] }),
  volume: attr('string', { defaultValue: null }),
  issue: attr('string', { defaultValue: null }),
  number: attr(),
  publicationYear: attr('string', { defaultValue: null }),
  contributors: fragmentArray('related-item-contributor', { defaultValue: [] }),
  firstPage: attr('string', { defaultValue: null }),
  lastPage: attr('string', { defaultValue: null }),
  publisher: fragment('publisher'),
  edition: attr('string', { defaultValue: null }),

  title: computed('titles.@each.title', function () {
    if (this.titles.length > 0) {
      return A(this.titles).get('firstObject').title;
    } else {
      return null;
    }
  }),
  relatedItemContributors: reads('contributors')
});
