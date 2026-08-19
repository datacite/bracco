import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import nodeJsonWebToken from 'jsonwebtoken';

module('Unit | Service | current user', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let service = this.owner.lookup('service:current-user');
    assert.ok(service);
  });

  test('load waits for JWT verification before resolving', async function (assert) {
    let service = this.owner.lookup('service:current-user');
    service.set('session', {
      data: { authenticated: { access_token: 'test-token' } }
    });

    let verificationCallback;
    let originalVerify = nodeJsonWebToken.verify;
    nodeJsonWebToken.verify = function (...args) {
      verificationCallback = args[3];
    };

    try {
      let settled = false;
      let loadPromise = service.load().then(function () {
        settled = true;
      });

      assert.notOk(
        settled,
        'load remains pending while JWT verification is pending'
      );

      verificationCallback(null, { uid: '123', role_id: 'user' });
      await loadPromise;

      assert.true(settled, 'load resolves after JWT verification');
      assert.strictEqual(service.role_id, 'user');
    } finally {
      nodeJsonWebToken.verify = originalVerify;
    }
  });
});
