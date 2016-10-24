
import $ from 'jquery';
import _ from 'lodash';
import template from '../templates/dashbord.hbs';
import Collection from '../collections/items';
import ItemView from '../views/item';
import firebase from 'firebase';
import { service } from '../services/service';

export default Backbone.View.extend({


    events: {
        'click #create': 'create'
    },
    initialize: function () {
        this.collection = new Collection();
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        console.log("initialize dasbord");
        this.collection.fetch();
        this.render();
    },


    render: function () {
        console.log("initialize dasbord render");
        console.log("this collection", this.collection)
        var v = template({ name: "Welcome to Backbone!" });
        this.$el.html(v);
        this.$items = this.$('#item-table');
    },
    addOne: function (todo) {
        var view = new ItemView({ model: todo });
        this.$items.append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function () {
        this.$items.empty();
        this.collection.each(this.addOne, this);
    },
    create: function () {
        let item = {
            title: $('.row #title').val(),
            login: $('.row #login').val(),
            password: $('.row #password').val(),
            detail: $('.row #details').val()
        }
        console.log('create',item);
        this.collection.create(item);
        console.log(this.collection.length);
    }


});