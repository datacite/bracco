import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

const certificateList = [
  'CLARIN',
  'CoreTrustSeal',
  'DIN 31644',
  'DINI',
  'DSA',
  'RatSWD',
  'WDS'
];

@classic
export default class RepositoryCertificate extends Component {
  @service
  store;

  certificate = null;
  certificateList = certificateList;
  certificates = certificateList;

  @action
  searchCertificate(query) {
    let certificates = certificateList.filter(function (certificate) {
      return certificate.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('certificates', certificates);
  }

  @action
  selectCertificate(certificate) {
    this.model.get('certificate').replace(this.index, 1, [certificate]);
    this.set('certificates', certificateList);
  }

  @action
  deleteCertificate() {
    this.model.get('certificate').removeAt(this.index);
  }
}
