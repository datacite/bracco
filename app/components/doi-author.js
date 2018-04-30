import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import Component from '@ember/component';
import EmberObject from '@ember/object';

const AuthorValidations = buildValidations({
  name: validator('presence', true)
});

const Author = EmberObject.extend(AuthorValidations);

const Validations = buildValidations({
  'author': validator('has-many')
});

export default Component.extend(Validations, {
  tagName: 'div',
  classNames: ['form-group'],
  // isDisabled: Ember.computed('model', function() {
  //   return Ember.isEmpty(this.get('model').get('author').get('lastObject'));
  // }),

  didReceiveAttrs() {
    this._super(...arguments);

    this.createAuthors();
    //this.createNewAuthor();
  },

  createAuthors() {
    let authors = JSON.parse(this.get('model').get('author'));

    if (!authors.length > 0) {
      authors = authors.pushObject([{ name: '' }]);
    }

    authors = authors.map(function(a) {
      let name = (a['family-name']) ? [a['family-name'], a['given-name']].join(", ") : a.name;
      return { name: name };
    });

    const owner = Ember.getOwner(this);
    authors = authors.map(a => Author.create(owner.ownerInjection(), a));
    this.set('authors', authors);
  },
  authorList(authors) {
    authors = authors.map(function(a) {
      return { name: a.name };
    });
    return JSON.stringify(authors);
  },

  // createNewAuthor() {
  //   const owner = Ember.getOwner(this);
  //   let author = Author.create(owner.ownerInjection());
  //   this.set('author', author);
  // },

  add() {
    this.get('authors').pushObject({ name: '' });
    this.get('model').set('author', this.authorList(this.get('authors')));
  },
  update() {
    this.get('model').set('author', this.authorList(this.get('authors')));
  },
  delete(item) {
    this.get('authors').removeObject(item);
    this.get('model').set('author', this.authorList(this.get('authors')));
  },

  actions: {
    add() {
      this.add();
    },
    update(item) {
      this.update(item);
    },
    delete(item) {
      this.delete(item);
    }
  }
});
