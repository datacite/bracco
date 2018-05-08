import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (!serialized || serialized === 'xmlversiog==') {
      return null;
    } else {
      let xml = this.b64DecodeUnicode(serialized);
      return ["<hsh></hsh>", "ée"].includes(xml) ? '' : xml;
    }
  },

  serialize(deserialized) {
    if (!deserialized) {
      return null;
    } else {
      return this.b64EncodeUnicode(deserialized);
    }
  },
  b64EncodeUnicode(str) {
      // first we use encodeURIComponent to get percent-encoded UTF-8,
      // then we convert the percent encodings into raw bytes which
      // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
      }));
  },
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
});
