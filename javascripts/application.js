/*
 *
 * Title:   Emergent Task Timer
 * Author:  Daniel Marino
 * Revised: July 2010
 *
 */

/*global window, document, localStorage $ */

$(document).ready(function() {

    // Variable for counting increment checkboxes
    var num = 0;

    // Adds Unique Ids to increments
    function addUniqueIds(el) {
      $(el).each(function() {
          $(this).find("label").attr("for", "field_" + num);
          $(this).find(':input').attr("id", "field_" + num).attr("name", "field_" + num);
          num++;
      });
    }

    // Store data via localStorage
    function storeData() {
        var bett = $(":input").serializeArray();
        localStorage.bett = JSON.stringify(bett);
        return false;
    }

    // Create some table columns
    (function createTableColumns() {
        var td = $(".t_inc").html(), html = "";
        for (var i = 1; i < 12; i++) {
            html += '<td id="tc_' + i + '" class="t_inc">' + td + '</td>';
        }
        $(".t_inc").replaceWith(html);
    }());

    // Add unique ids to first tr of increment checkboxes
    (function addIds() {
        var tr = $("#task_1 .task_title, #task_1 .increment");
        addUniqueIds(tr);
    }());

    // Get todays date
    (function todaysDate() {
        var d = new Date(), month = d.getMonth(), day = d.getDate(), year = d.getFullYear();
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

        if (localStorage.bett) {
            //alert("There is localStorage data!");
            // var jsonData = JSON.parse(localStorage.bett);
            // alert($.dump(jsonData));
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
            // Updates task total
            $(parent).find(".task_time_total").text(task_total);
            // Updates day total
            $("#day_time_total").text(day_total);
            storeData();
            return false;
        });
    }());

    // Actions taking place when task title is filled in
    (function incrementCheckbox() {
        $(".t_title").live("keyup", function() {
            storeData()
        });
    }());

    // Add a task
    (function add_task() {
        var theHTML = $("#task_1").html()
        $("#add_task").click(function() {
            var theId = $("#tasks tbody tr").length + 1;
            $("tbody").append('<tr id="task_' + theId + '">' + theHTML + '</tr>');
            var tr = $("#task_" + theId + " .task_title, #task_" + theId + " .increment");
            addUniqueIds(tr);
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
            delete localStorage.bett;
            return false;
        });
    }());

    // Return false if form is submitted - otherwise data will be erased
    (function noSubmit() {
        $("form").submit(function() {
            return false;
        });
    }());

});