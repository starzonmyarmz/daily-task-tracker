/*global Backbone */

$(function(){

    var Task = Backbone.Model.extend({

        defaults: function() {
            return {
                "title": "",
                "time": this.setTime()
            };
        },

        setTime: function() {
            var time = [];
            for (var x = 0; x < 45; x++) {
                time[x] = false;
            }
            return time;
        }
    });

    var TaskCollection = Backbone.Collection.extend({
        model: Task,
        localStorage: new Store("dtt-tasks")
    });

    var Tasks = new TaskCollection();

    var TimeIncrement = Backbone.View.extend({

        tagName: 'a',
        className: 'increment',
        render: function() {
            $(this.el).html(this.model);
            console.log(this.model)
            return this;
        }

    });

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

            _.each(this.model.get("time"), function(inc) {
                console.log( new TimeIncrement({ model: inc }).render().el )
            });

            //this.$('.time').append(time);

            // See https://github.com/cramerdev/RidleyClient/blob/master/js/views/search/field.js#L67
            //var view = new TimeIncrement({ model: task });
            //$('.tasks').append(view.render().el);



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