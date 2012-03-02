/*global Backbone */

$(function(){

    var Task = Backbone.Model.extend({

        defaults: function() {
            return {
                "title": "",
                "time": this.setTime()
            };
        },

        /* 44 is equal to 11 hours split into 15 minute increments.
         * We set all the increments to false by default because the
         * increment is set to true when clicked on
         */
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

    var tasks = new TaskCollection();

    var TimeIncrement = Backbone.View.extend({
        tagName: 'a',
        className: 'increment',
        initialize: function() {

        },
        events: {
            //"click": "toggleIncrement"
        },
        render: function() {
            $(this.el).text(this.options.inc.toString());
            return this;
        },
        toggleIncrement: function(inc) {
            console.log(this)
        }
    });

    var TaskView = Backbone.View.extend({

        tagName: 'li',
        template: _.template($('.task-template').html()),

        events: {
            "keyup .title": "saveTask",
            "click .remove": "removeTask",
            "click .increment": "testFn"
        },

        render: function() {
            $(this.el).html(this.template);
            this.displayData();
            return this;
        },

        displayData: function() {
            var title = this.model.get("title");
            this.$('.title').val(title);

            var increments = [];

            _.each(this.model.get("time"), function(increment) {
                increments.push(new TimeIncrement({ inc: increment }).render().el);
            });

            this.$('.time').html(increments);
        },

        saveTask: function() {
            this.model.save({ title: $(this.el).find("input").val() });
        },

        removeTask: function() {
            this.model.destroy();
            $(this.el).remove();
        },
        testFn: function(t) {
            debugger
            //console.log(this.model.get("time"))
        }
    });

    var AppView = Backbone.View.extend({

        el: $('#dtt'),

        initialize: function() {
            tasks.on('add', this.addTask, this);
            tasks.on('reset', this.addAllTasks, this);

            tasks.fetch();
        },

        events: {
            "click .add": "createTask"
        },

        createTask: function() {
            tasks.create();
        },

        addTask: function(task) {
            var view = new TaskView({ model: task });
            $('.tasks').append(view.render().el);
        },

        addAllTasks: function() {
            tasks.each(this.addTask);
        }
    });

    window.app = new AppView();

});