import Component from '@ember/component';

export default Component.extend({
  classNames: ['form-group'],

  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  },

  actions: {
    didSelectFiles(files, resetInput) {
      var reader = new FileReader();
      let self = this;
      reader.onload = function(e) {
        var data = e.target.result;
        var xml = self.b64DecodeUnicode(data.split(",")[1]);
        self.get('model').set('xml', xml);
      }
      reader.readAsDataURL(files[0]);

      resetInput();
    }
  }
});
