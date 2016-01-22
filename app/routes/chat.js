import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    createMessage(message) {
      let newRecord = this.store.createRecord('message', {
        text: message,
        user: 'Joe'
      });

      newRecord.save();

      this.controller.set('textMessageFromInput', '');
    }
  }
});
