// Finish conversion of this component to a @glimmer component.
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
    this.certificates = certificates;
  }

  @action
  selectCertificate(certificate) {
    this.model.certificate.replace(this.index, 1, [certificate]);
    this.certificates = certificateList;
  }

  @action
  deleteCertificate() {
    this.model.certificate.removeAt(this.index);
  }
}
