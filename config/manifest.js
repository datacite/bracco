'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "DataCite Fabrica",
    short_name: "Fabrica",
    description: "DataCite Fabrica is the one place for you to create and find, connect and track every single DataCite DOI from your organization. Fabrica complements the REST, MDS, EZ, and OAI-PMH APIs. Fabrica includes all the functionalities needed to manage repositories, prefixes, DOIs and their metadata.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
    ],
    ms: {
      tileColor: '#fff',
    },
  };
}
