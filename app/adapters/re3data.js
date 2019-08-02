// import DS from 'ember-data';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// import { inject as service } from '@ember/service';
// import { isPresent } from '@ember/utils';
// import ENV from 'bracco/config/environment';

// const { JSONAPIAdapter } = DS;

// export default JSONAPIAdapter.extend(DataAdapterMixin, {
//   session: service(),
//   host: ENV.RE3DATA_API_URL,

//   authorize(xhr) {
//     let { access_token } = this.get('session.data.authenticated');
//     if (isPresent(access_token)) {
//       xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
//     }
//   }
// });