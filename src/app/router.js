import $ from 'jquery';
import Backbone from 'backbone';

import LoginView from './views/login';
import DashboardView from './views/dashbord';
import RegistrationdView from './views/register';
import { service } from './services/service';

export default Backbone.Router.extend({

    routes: {
        '': 'dashboard',
        'login': 'login',
        'signup': 'signup',
        'dashboard': 'dashboard',

    },

    initialize() {
        service.initService()
            .then(user => {
                console.log('auth user', user);
                $('#content').append('<div id="js-app"></div>');
                console.log("login ", service.getUser());
                console.log("initialise router");
                if (user) {
                    this.dashboard();
                } else {
                    this.login();
                }
                // this.render();
            }).catch(err => {
                console.error(err);
            })
        $("ul li").click(function () {
            $("ul li").removeClass("active");
            $(this).addClass("active");
        });
    },

    dashboard() {
        if (service.getUser()) {
            console.log("dashboard ")
            var dashboardView = new DashboardView();
            $('#js-app').empty().append(dashboardView.$el);
        }
    },

    login() {
        var loginView = new LoginView();
        $('#js-app').empty().append(loginView.$el);
    },
    signup() {
        var signup = new RegistrationdView();
        $('#js-app').empty().append(signup.$el);
    }

});
