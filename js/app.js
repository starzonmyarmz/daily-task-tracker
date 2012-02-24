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

    var TaskView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('.task-template').html()),

        render: function() {
            $(this.el).html(this.template());
            return this;
        }

    });

    var Tasks = new TaskCollection();

    var AppView = Backbone.View.extend({

        el: $('#dtt'),

        initialize: function() {
            this.input = this.$("input");

            //Tasks.on('add', this.addTask, this);

            Tasks.fetch();
        },

        events: {
            "click .add": "createTodo"
        },

        addTask: function() {

        },

        createTodo: function(task) {
            //Tasks.create({ title: this.input.val() });
            var view = new TaskView({ model: task });
            $('#dtt').prepend(view.render().el);
        }
    });

    window.app = new AppView();

});