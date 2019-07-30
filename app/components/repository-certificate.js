import Component from '@ember/component';
import { inject as service } from '@ember/service';

const certificateList = [
  'CoreTrustSeal',
  'DSA',
  'WDS',
  'DINI'
]

export default Component.extend({
  store: service(),

  certificate: null,
  certificateList,
  certificates: certificateList,

  actions: {
    searchCertificate(query) {
      var certificates = certificateList.filter(function (certificate) {
        return certificate.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('certificates', certificates);
    },
    selectCertificate(certificate) {
      this.model.get('certificate').replace(this.index, 1, [certificate])
      this.set('certificates', certificateList);
    },
    deleteCertificate() {
      this.model.get('certificate').removeAt(this.index);
    },
  }
});
