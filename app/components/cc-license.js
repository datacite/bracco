import Ember from 'ember';
import URI from 'npm:urijs';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['license'],

  didInsertElement: function() {
    let licenseURL = this.get('licenseURL');
    let licenseLogo = licenseURL;
    this.set('licenseURL', licenseURL);
    let uri = new URI(licenseURL);

    if (uri.hostname() === "creativecommons.org") {
      let labels = uri.segment(1).split("-");
      labels.unshift("cc");

      licenseLogo = labels.reduce(function (sum, key) {
        if (Ember.String.w("public publicdomain").includes(key)) {
          key = "zero";
        };
        if (Ember.String.w("cc by nd nc sa zero").includes(key)) {
          return sum + ' <i class="cc cc-' + key + '"></i>';
        } else {
          return sum;
        }
        return a + b;
      }, '');
    } else if (uri.hostname() === "opensource.org") {
      switch(uri.segment(1)) {
        case 'MIT':
          licenseLogo = '<img src="https://img.shields.io/:license-MIT-blue.svg" />';
      }
    } else {
    }
    this.set('licenseLogo', Ember.String.htmlSafe(licenseLogo));
  }
});

// export default Ember.Helper.helper(ccLicense);

//               <i class="cc cc-by-nd"></i>

// def license_img(license)
//   uri = URI.parse(license)
//   if uri.host == "creativecommons.org"
//     _head, prefix, type, version, _tail = uri.path.split('/', 5)
//     if prefix == "publicdomain"
//       "https://licensebuttons.net/p/zero/1.0/80x15.png"
//     else
//       #version = version.to_s.gsub(/(\d)\.\d/, '/1.0')
//       "https://licensebuttons.net/l/#{type}/#{version}/80x15.png"
//     end
//   elsif uri.host == "opensource.org"
//     _head, prefix, type = uri.path.split('/', 3)
//     type = type.gsub('-', ' ')
//     "https://img.shields.io/:license-#{URI.escape(type)}-blue.svg"
//   end
// end
