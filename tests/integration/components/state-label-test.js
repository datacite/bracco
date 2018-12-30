import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('state-label', 'Integration | Component | state label', {
  integration: true
});

// test('it renders draft', function(assert) {
//   this.set('state', 'draft');

//   this.render(hbs`{{state-label state=state}}`);

//   assert.equal(this.$('span.label-default').text().trim(), 'Draft');
// });

test('it renders registered', function(assert) {
  this.set('state', 'registered');

  this.render(hbs`{{state-label state=state}}`);

  assert.equal(this.$('span.label-info').text().trim(), 'Registered');
});

test('it renders findable', function(assert) {
  this.set('state', 'findable');

  this.render(hbs`{{state-label state=state}}`);

  assert.equal(this.$('span.label-primary').text().trim(), 'Findable');
});
