/*
 *
 * Title:   Emergent Task Timer
 * Author:  Daniel Marino
 * Revised: July 2010
 *
 */

/*global window, document, $ */

$(document).ready(function() {


    // Actions taking place when increment box is checked/unchecked
    (function increment_checkbox() {
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
            $(parent).find("span").text(task_total);

            // Updates day total
            $("#day_time_total").text(day_total);

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

});