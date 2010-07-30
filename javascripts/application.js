/*
 *
 * Title:   Emergent Task Timer
 * Author:  Daniel Marino
 * Revised: July 2010
 *
 */

/*global window, document, localStorage $ */

$(document).ready(function() {

    // Create some markup
    (function incrementMarkup() {
        var td = $(".task_increment").html(), html = "";
        for (var i = 1; i < 12; i++) {
            html += '<td id="tc_' + i + '" class="task_increment">' + td + '</td>';
        }
        $(".task_increment").replaceWith(html);
    }());

    // Get todays date
    (function todaysDate() {
        var d = new Date(),
            month = d.getMonth(),
            day   = d.getDate(),
            year  = d.getFullYear();
        switch (month) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
            default:
                break;
        }
        $("#today time").append(month + " " + day + ", " + year);
    }());


    // Load data from localStorage if record exists
    (function loadData() {

    }());

    // Actions taking place when increment box is checked/unchecked
    (function incrementCheckbox() {
        $(".increment label").live("click", function() {

            // Add/removes .active class and checks/unchecks input checkbox
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).next().removeAttr("checked");
            } else {
                $(this).addClass("active");
                $(this).next().attr("checked", "checked");
            }

            var parent     = $(this).parents("tr"),
                task_total = parent.find(".active").length * 0.25,
                day_total  = $("body").find(".active").length * 0.25;

            // Updates task total
            $(parent).find(".task_time_total").text(task_total);

            // Updates day total
            $("#day_time_total").text(day_total);

            // Store data via localStorage
            var currentData = $("#tasks_form").serializeArray();
            localStorage.taskData = JSON.stringify(currentData);

        });
    }());

    // Add a task
    (function add_task() {
        var theHTML = $("#task_1").html();
        $("#add_task").click(function() {
            var theId = $("#tasks tbody tr").length + 1;
            $("tbody").append('<tr id="task_' + theId + '">' + theHTML + '</tr>');
        });
    }());

    // Change styles on task title
    (function taskTitleClass() {
        var input = $(".task_title input");
        input.live("blur", function() {
            if ($(this).val()) {
                $(this).addClass("has_value");
            } else {
                $(this).removeClass("has_value");
            }
        });
        input.live("focus", function() {
            $(this).removeClass("has_value");
        });
    }());

    // Switch task title input to textarea for mobile devices
    (function inputToTextarea() {
        $(window).bind("resize load", function() {
            var input = $(".task_title input, .task_title textarea");
            input.each(function() {
                var val  = $(this).val(),
                    name = $(this).attr("name"),
                    id   = $(this).attr("id"),
                    clss = $(this).attr("class"),
                    atts = 'placeholder="Edit task title&hellip;" autocomplete="off"';
                if ($(window).width() < 800) {
                    $(this).replaceWith('<textarea name="' + name + '" id="' + id + '" class="' + clss + '"' + atts + '>' + val + '</textarea>');
                } else {
                    $(this).replaceWith('<input name="' + name + '" id="' + id + '" class="' + clss + '"' + atts +'value="' + val + '" />');
                }
            });
        });
    }());

    // Return false if form is submitted - otherwise data will be erased
    (function noSubmit() {
        $("form").submit(function() {
            return false;
        });
    }());

});