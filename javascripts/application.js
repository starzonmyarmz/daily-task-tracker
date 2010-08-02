/*
 *
 * Title:   Emergent Task Timer
 * Author:  Daniel Marino
 * Revised: July 2010
 *
 */

/*global window, document, localStorage $ */

$(document).ready(function() {

    // Set some variables
    var num = 0, rowHTML = "";

    // Adds Unique Ids to increments
    function addUniqueIds(el) {
      $(el).each(function() {
          $(this)
              .find("label")
              .attr("for", "field_" + num);
          $(this)
              .find(':input')
              .attr("id", "field_" + num)
              .attr("name", "field_" + num);
          num++;
      });
    }

    function addRow() {
        var theId = $("#tasks tbody tr").length + 1;
        $("tbody").append('<tr id="task_' + theId + '">' + rowHTML + '</tr>');
        var tr = $("#task_" + theId + " .task_title, #task_" + theId + " .increment");
        addUniqueIds(tr);
    }

    // Store data via localStorage
    function storeData() {
        var data = $("#tasks_form").serializeArray(),
            rows = { "rows" : $("tbody tr").length };
        data.unshift(rows);
        localStorage.bett = JSON.stringify(data);
        return false;
    }

    // Create some table columns
    (function createFirstRow() {
        var td = $(".t_inc").html(), html = "";
        // We need to create at least one row
        for (var i = 1; i < 12; i++) {
            html += '<td id="tc_' + i + '" class="t_inc">' + td + '</td>';
        }
        $(".t_inc").replaceWith(html);
        // Add unique ids to first tr of increment checkboxes
        var tr = $("#task_1 .task_title, #task_1 .increment");
        // This will be the html used for creating new rows
        rowHTML = $("#task_1").html();
        addUniqueIds(tr);
    }());

    // Get todays date
    (function todaysDate() {
        var theDate = new Date(),
            m       = theDate.getMonth(),
            month   = m + 1,
            d       = theDate.getDate(),
            y       = theDate.getFullYear(),
            months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if (d < 10) {
            day = "0" + d;
        }
        if (month < 10) {
            month = "0" + month;
        }
        $("#today time")
            .attr("datetime", y + "-" + month + "-" + day)
            .text(months[m] + " " + d + ", " + y);
    }());

    // Load data from localStorage if record exists
    (function loadData() {
        if (localStorage.bett) {
            var jsonData = JSON.parse(localStorage.bett),
                numRows  = jsonData[0].rows;
            // Create extra rows if necessary
            if (numRows > 1) {
                for (var i = 1; i < numRows; i++) {
                    addRow();
                }
            }
            // Insert titles and check checkboxes
            for (var i = 0; i < jsonData.length; i++) {
                var el = $("#" + jsonData[i].name);
                if (el.is("textarea")) {
                    if (jsonData[i].value) {
                        el.text(jsonData[i].value);
                        el.addClass("has_value");
                    }
                } else {
                    el.attr("checked", "checked");
                    el.prev().addClass("active");
                }
            }
            // Updates task time total
            var task_total;
            $("tbody tr").each(function() {
                task_total = $(this).find("input:checked").length * 0.25;
                $(this).find(".task_time_total").text(task_total);
            });
            // Update daily time totals
            var day_total  = $("body").find("input:checked").length * 0.25;
            $("#day_time_total").text(day_total);
        }
    }());

    // Actions taking place when increment box is checked/unchecked
    (function incrementCheckbox() {
        $(".increment").live("click", function() {
            // Add/removes .active class and checks/unchecks input checkbox
            var l = $(this).find("label"), i = $(this).find("input");
            if (l.hasClass("active")) {
                l.removeClass("active");
                i.removeAttr("checked");
            } else {
                l.addClass("active");
                i.attr("checked", "checked");
            }
            var parent     = $(this).parents("tr"),
                task_total = parent.find("input:checked").length * 0.25,
                day_total  = $("body").find("input:checked").length * 0.25;
            // Updates task time total
            $(parent).find(".task_time_total").text(task_total);
            // Updates daily time total
            $("#day_time_total").text(day_total);
            storeData();
            return false;
        });
    }());

    // Actions taking place when task title is filled in
    (function incrementCheckbox() {
        $(".t_title").live("keyup", function() {
            storeData();
        });
    }());

    // Add a task
    (function add_task() {
        $("#add_task").click(function() {
            addRow();
        });
    }());

    // Change styles on task title
    (function taskTitleClass() {
        var input = $(".t_title");
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

    // Wipe out localStorage
    (function noSubmit() {
        $("#clear_data").click(function() {
            $("tbody tr:not(#task_1)").remove();
            $(":input").val("").removeAttr("checked");
            $(".increment label").removeClass("active");
            $(".task_time_total, #day_time_total").text("0");
            delete localStorage.bett;
            return false;
        });
    }());

    // Return false if form is somehow submitted
    (function noSubmit() {
        $("form").submit(function() {
            return false;
        });
    }());

});