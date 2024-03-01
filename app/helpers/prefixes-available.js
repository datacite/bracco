import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  prefixes: service(),

  compute([provider_id]) {
    return this.prefixes.available(provider_id);
  }
});
