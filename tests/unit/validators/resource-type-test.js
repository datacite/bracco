import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

module('Unit | Validator | resource-type', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:resource-type');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });

  test('it validates', function (assert) {
    assert.expect(19);

    let validResourceTypesGeneral = [
      'Audiovisual',
      'Collection',
      'DataPaper',
      'Dataset',
      'Event',
      'Image',
      'InteractiveResource',
      'Model',
      'PhysicalObject',
      'Service',
      'Software',
      'Sound',
      'Text',
      'Workflow',
      'Other'
    ];

    let invalidResourceTypesGeneral = [
      'Preprint',
      'JournalArticle',
      'DataManagementPlan',
      'ComputationalNotebook'
    ];

    validResourceTypesGeneral.forEach((resourceType) =>
      assert.equal(
        validator.validate(resourceType),
        true,
        `validation of ${resourceType} must succeed`
      )
    );

    invalidResourceTypesGeneral.forEach((resourceType) =>
      assert.equal(
        validator.validate(resourceType),
        `${resourceType} is not a valid resource type.`,
        `validation of ${resourceType} must fail`
      )
    );
  });
});
