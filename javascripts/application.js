/*
 *
 * Title:   Emergent Task Timer
 * Author:  Daniel Marino
 * Revised: July 2010
 *
 */

/*global window, document, $ */

$(document).ready(function() {

    /*
     * Checks/Unchecks input if increment box is checked/unchecked
     * Updates task time total and day time total
     *
     */

    (function increment_checkbox() {
        $(".increment label").live("click", function() {

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

            $(parent).find("span").text(task_total);
            $("#day_time_total").text(day_total);
            
        });
    }());

    // Add a task
    (function add_task() {
        var theHTML = $("#task_1").html();
        $("#add_task").click(function() {
            $("tbody").append("<tr>" + theHTML + "</tr>");
        });
    }());

});