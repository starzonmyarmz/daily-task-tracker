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

        events: {
            "keyup .title": "saveTask",
            "click .remove": "removeTask"
        },

        render: function() {
            $(this.el).html(this.template);
            this.displayData();
            return this;
        },

        displayData: function() {
            var title = this.model.get("title");
            this.$('.title').val(title);
        },

        saveTask: function() {
            this.model.save({ title: $(this.el).find("input").val() });
        },

        removeTask: function() {
            this.model.destroy();
            $(this.el).remove();
        }
    });

    var AppView = Backbone.View.extend({

        el: $('#dtt'),

        initialize: function() {
            Tasks.on('add', this.addTask, this);
            Tasks.on('reset', this.addAllTasks, this);

            Tasks.fetch();
        },

        events: {
            "click .add": "createTask"
        },

        createTask: function() {
            Tasks.create();
        },

        addTask: function(task) {
            var view = new TaskView({ model: task });
            $('.tasks').append(view.render().el);
        },

        addAllTasks: function() {
            Tasks.each(this.addTask);
        }
    });

    window.app = new AppView();

});