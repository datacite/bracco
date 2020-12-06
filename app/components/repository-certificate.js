import Component from '@ember/component';
import { inject as service } from '@ember/service';

const certificateList = [
  'CLARIN',
  'CoreTrustSeal',
  'DIN 31644',
  'DINI',
  'DSA',
  'RatSWD',
  'WDS'
];

export default Component.extend({
  store: service(),

  certificate: null,
  certificateList,
  certificates: certificateList,

  actions: {
    searchCertificate(query) {
      let certificates = certificateList.filter(function (certificate) {
        return certificate.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('certificates', certificates);
    },
    selectCertificate(certificate) {
      this.model.certificate.replace(this.index, 1, [certificate]);
      this.set('certificates', certificateList);
    },
    deleteCertificate() {
      this.model.certificate.removeAt(this.index);
    }
  }
});
