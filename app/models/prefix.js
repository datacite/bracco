import DS from 'ember-data';

export default DS.Model.extend({
  meta: DS.attr(),

  created: DS.attr('date')
});
