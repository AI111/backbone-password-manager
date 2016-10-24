

import $ from 'jquery';
import _ from 'lodash';
import Todo from '../models/item';
import Store from 'backbone.localstorage';
import firebase from 'firebase';
import { service } from '../services/service';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
    // Reference to this collection's model.
    // var todo = new Todo();
    model: Todo,
    modelId: function (attrs) {
        return attrs.id;
    },
    // Filter down the list of all todo items that are finished.
    completed: function () {
        return this.where({ completed: true });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
        return this.where({ completed: false });
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
        return this.length ? this.last().get('order') + 1 : 1;
    },

    parse: function (response) {
        let models = [];
        for (let key in response) {
            let value = response[key];
            value.id = key;
            models.push(value);
        }
        return models;

    },
    sync: function (method, collection, options) {
        let userId = service.getUser().uid;

        if (method === 'read') {
            service.getUser().getToken().then((data) => {
                // console.log("token", data);
                
                
                options.url = 'https://backbone-90bb1.firebaseio.com/users/' + userId + "/items.json";
            // options.headers = {
            //     'Authorization': 'Bearer=' + data
            // }
            Backbone.Model.prototype.sync.apply(this, arguments);
            })
            
        }

        console.log("collection sync", collection);
        //   if (method ==='read'){
        //       service.getItems()
        //           .then(data=>{
        //               console.log(data);
        //               data.forEach((item)=>{
        //                   console.log(item.getKey(),item.val());
        //                   let value = item.val();
        //                 //   value.id=item.getKey();
        //                   collection.models.push(value);
        //                   console.log("collection sync",collection);
        //                   this.reset(collection);
        //               });
        //           }).catch(err =>{
        //          console.error(err)
        //       });
        //   }

    }
    // Todos are sorted by their original insertion order.
    //   comparator: 'order'
});




