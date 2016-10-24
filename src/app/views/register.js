import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import firebase from 'firebase';
import template from '../templates/register.hbs';
import { service } from '../services/service';

export default Backbone.View.extend({

    template: template,
    events: {
        'click #signin': 'signIn'
        },
    initialize: function () {
        console.log("firebase", firebase);
        this.render();
    },
    render: function () {
        this.user = service.getUser();
        this.$el.html(this.template({auth:this.user!==null}));
    },
    signIn(){
        let email = $('#inputEmail').val();
        let password = $('#inputPassword').val();
        let password2 = $('#inputPassword2').val();
        if (password!==password2){
            this.handleError('passwords not match');
            return;
        }
        service.handleSignUp(email,password)
        .then(user =>{
            window.location.hash = 'dashboard';
        })
        .catch(err =>{
            this.handleError(err);
        });
    },
    handleError(error){
        $('.has-error').show().text(err);
    }
});