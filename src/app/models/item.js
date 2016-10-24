
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import { service } from '../services/service';

export default Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
        title: '',
        login: '',
        password: '',
        detail: ''
    },
    idAttribute: 'id',
    validate: function (attrs, options) {
        if (attrs.password.length < 1 || attrs.login.length < 1) {
            return "Password and login are empty";
        }
    },

    sync: function (method, model, options) {
        let userId = service.getUser().uid;
        if (method === "delete") {
            options.url = 'https://backbone-90bb1.firebaseio.com/users/' + userId + "/items/" + model.id + ".json";
            Backbone.Model.prototype.sync.apply(this, arguments);
        } else if (method === "create") {
            service.addItem(model.attributes);
        } else if (method === "update"){
            options.url = 'https://backbone-90bb1.firebaseio.com/users/' + userId + "/items/" + model.id + ".json";
            Backbone.Model.prototype.sync.apply(this, arguments);
        } 
        console.log("item sync", arguments);
    }
});
