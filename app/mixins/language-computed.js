// https://api.emberjs.com/ember/release/classes/Mixin?show=inherited
import Ember from 'ember';
import ISO6391 from 'iso-639-1';
import { computed } from '@ember/object';

export default Ember.Mixin.create({
  languagePropertyPath: 'fragment.lang',
  language: computed(languagePropertyPath, function() {
    return ISO6391.getName(this.get(languagePropertyPath)) !== ''
      ? ISO6391.getName(this.get(languagePropertyPath))
      : this.get(languagePropertyPath);
  }),
});