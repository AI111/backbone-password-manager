import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import firebase from 'firebase';
import template from '../templates/login.hbs';
import { service } from '../services/service';

export default Backbone.View.extend({

    template: template,
    events: {
        'click #login': 'login',
        'click #logout': 'logout'

    },
    initialize: function () {
        console.log("firebase", firebase);

        console.log(this.user);
        this.render();

    },
    render: function () {
        this.user = service.getUser();
        this.$el.html(this.template({ auth: this.user !== null }));
    },
    login() {
        let email = $('#inputEmail').val();
        let password = $('#inputPassword').val();
        service.toggleSignIn(email, password)
            .then(user => {
                 window.location.hash = 'dashboard';
            }).catch(err => {
                handleError(err)
            });
    },
    logout() {
        service.signOut();
        this.render()
    },
    handleError(err) {
        $('.has-error').show().text(err);
    }

});
