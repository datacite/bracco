import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default class PrefixesAvailable extends Helper {
  @service
  prefixes;

  compute([provider_id]) {
    return this.prefixes.available(provider_id);
  }
}
