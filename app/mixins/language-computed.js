// https://api.emberjs.com/ember/release/classes/Mixin?show=inherited
import Ember from 'ember';
import ISO6391 from 'iso-639-1';
import { computed } from '@ember/object';

export default Ember.Mixin.create({
  language: computed('fragment.lang', function() {
    return ISO6391.getName(this.get('fragment.lang')) !== ''
      ? ISO6391.getName(this.get('fragment.lang'))
      : this.get('fragment.lang');
  }),
});