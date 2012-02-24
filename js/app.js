/*global Backbone */

$(function(){

    window.Task = Backbone.Model.extend({

        initialize: function() {

        }

    });

    window.TaskCollection = Backbone.Collection.extend({
        model: Task,
        localStorage: new Store("dtt-tasks")
    });

    window.TaskView = Backbone.View.extend({
    });

    var Tasks = new TaskCollection;

    window.AppView = Backbone.View.extend({

        el: $('#dtt'),

        initialize: function() {
            this.input = this.$("input");
        },

        events: {
            "click button": "createTodo"
        },

        createTodo: function() {
            Tasks.create({ title: this.input.val() });
        }
    });

    window.app = new AppView;

});