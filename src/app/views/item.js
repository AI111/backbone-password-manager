
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import firebase from 'firebase';
import template from '../templates/item.hbs';
export default Backbone.View.extend({
    tagName:"tr",
    template: template,
    events: {
        'click .password-field': 'showPassword',
        'dblclick label': 'edit',
        'click #remove': 'removeItem',
        'click #edit': 'editToggle',
        'click #save': 'saveEditedItem',
        'click .pass-masked': 'passwordToggle'

    },
    initialize: function () {
        // console.log("firebase",firebase);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },
    render: function () {
        // console.log("item render",this.model);
        this.$el.html((this.template(this.model.toJSON())));
        return this;
    },
    showPassword(ev) {
        console.log("show password", ev);
    },
    removeItem() {
        console.log('remove model');
        this.model.destroy();
    },
    editToggle() {

            this.$el.find(".toggle").toggle();
    },
    passwordToggle() {

            this.$el.find(".pass-masked").toggle();
    },
    saveEditedItem(){
        let item = {
            id: this.model.attributes.id,
            title: this.$el.find('#title').val(),
            login: this.$el.find('#login').val(),
            password: this.$el.find('#password').val(),
            detail: this.$el.find('#details').val()
        }
        
			if (!_.isEqual(item,this.model.attributes)) {
                this.editToggle();
				this.model.save(item,{wait:true});
                
				this.model.trigger('change');
            }else{
                this.editToggle();
            }
            

    }


});
