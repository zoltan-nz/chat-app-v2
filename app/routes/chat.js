import Ember from 'ember';

export default Ember.Route.extend({

  userFromParams: null,

  model(params) {
    this.set('userFromParams', params.user_name);
    return this.store.findAll('message');
  },

  actions: {
    createMessage(message) {
      let newRecord = this.store.createRecord('message', {
        text: message,
        user: this.get('userFromParams')
      });

      newRecord.save();

      this.controller.set('textMessageFromInput', '');
    }
  }
});
