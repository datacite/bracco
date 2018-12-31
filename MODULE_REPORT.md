## Module Report
### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/password.js` at line 16

```js
        self.get('session').invalidate();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/password.js` at line 38

```js
          });
        } else {
          Ember.Logger.assert(false, response)
        }
      }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/password.js` at line 41

```js
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error)
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/reset.js` at line 35

```js
          });
        } else {
          Ember.Logger.assert(false, response)
        }
      }).catch(function(reason) {
```

### Unknown Global

**Global**: `Ember.Inflector`

**Location**: `app/initializers/inflector.js` at line 4

```js

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('status');
  inflector.uncountable('settings');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-list.js` at line 82

```js
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-show.js` at line 52

```js
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-show.js` at line 55

```js
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-show.js` at line 118

```js
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-show.js` at line 132

```js
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-show.js` at line 160

```js
    },
    onError(error) {
      Ember.Logger.assert(false, error)
    },
    searchSoftware(query) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-usage-stats.js` at line 50

```js
          });
        } else {
          Ember.Logger.assert(false, response);
        }
      }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-usage-stats.js` at line 53

```js
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error);
      });
    }).catch(function(error){
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/client-usage-stats.js` at line 56

```js
      });
    }).catch(function(error){
      Ember.Logger.assert(false, error);
    });
  }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/doi-doi.js` at line 63

```js
        });
      } else {
        Ember.Logger.assert(false, response)
        return null;
      }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/doi-doi.js` at line 67

```js
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/doi-url.js` at line 42

```js
        });
      } else {
        Ember.Logger.assert(false, response);
      }
    }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/doi-url.js` at line 45

```js
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error);
    });
  }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/doi-usage-stats.js` at line 46

```js
        });
      } else {
        Ember.Logger.assert(false, response);
      }
    }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/doi-usage-stats.js` at line 49

```js
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error);
    });
  }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/model-validation-errors.js` at line 13

```js
    if (errors.length > 0) {
      errors.forEach((item) => {
        Ember.Logger.assert(false, item);
      });
    }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-list.js` at line 86

```js
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-show.js` at line 71

```js
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-show.js` at line 74

```js
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-show.js` at line 135

```js
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-show.js` at line 143

```js
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-show.js` at line 152

```js
          self.get('router').transitionTo('/providers');
        }).catch(function(reason){
          Ember.Logger.assert(false, reason);
        });
      }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/components/provider-show.js` at line 163

```js
    },
    onError(error) {
      Ember.Logger.assert(false, error)
    },
    searchCountry(query) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/index.js` at line 15

```js
      return admin;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('index');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/settings.js` at line 12

```js
      return admin;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
    });
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/validators/metadata.js` at line 51

```js
          });
        } else {
          Ember.Logger.assert(false, response);
        }
      }).catch(function(error) {
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/validators/metadata.js` at line 54

```js
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error);
      });
    }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show.js` at line 13

```js
      return client;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('index');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/providers/show.js` at line 13

```js
      return provider;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/transfer.js` at line 11

```js
      return client;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/settings.js` at line 10

```js
      return client;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/clients/show/dois/new.js` at line 46

```js
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/clients/show/dois/upload.js` at line 22

```js
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/providers/show/prefixes/new.js` at line 14

```js
        self.transitionToRoute('providers.show.prefixes', providerPrefix.get('provider'));
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/controllers/clients/show/prefixes/new.js` at line 14

```js
        self.transitionToRoute('clients.show.prefixes', clientPrefix.get('client'));
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/prefixes/show.js` at line 12

```js
      return clientPrefixes.get("firstObject");
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/providers/show/prefixes/delete.js` at line 12

```js
      return providerPrefixes.get("firstObject");
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/providers/show/prefixes/show.js` at line 12

```js
      return providerPrefixes.get("firstObject");
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/dois/show/delete.js` at line 10

```js
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/dois/show/index.js` at line 10

```js
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/dois/show/modify.js` at line 10

```js
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/routes/clients/show/dois/show/edit.js` at line 10

```js
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
```
