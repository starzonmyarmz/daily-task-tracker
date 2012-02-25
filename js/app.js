/*global Backbone */

$(function(){

    var Task = Backbone.Model.extend({

        initialize: function() {

        }

    });

    var TaskCollection = Backbone.Collection.extend({
        model: Task,
        localStorage: new Store("dtt-tasks")
    });

    var Tasks = new TaskCollection();

    var TaskView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('.task-template').html()),

        initialize: function() {


            //Tasks.on('add', this.saveTask, this);

        },

        events: {
            "keyup .title": "saveTask",
            "click .remove": "removeTask"
        },

        render: function() {

            $(this.el).html(this.template);

            this.input = $(this.el).find("input");

            return this;

        },

        saveTask: function() {
            this.model.save({ title: this.input.val() });
            console.log('saved');
        },

        removeTask: function() {

        }

    });

    var AppView = Backbone.View.extend({

        el: $('#dtt'),

        initialize: function() {

            Tasks.on('add', this.addTask, this);

        },

        events: {
            "click .add": "createTask"
        },

        createTask: function() {
            Tasks.create();
        },

        addTask: function(task) {
            var view = new TaskView({ model: task });
            $('#dtt').append(view.render().el);
        }
    });

    window.app = new AppView();

});