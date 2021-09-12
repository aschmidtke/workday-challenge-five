var today = moment().format("dddd, MMMM Do YYYY, h:mm");
$("#currentDay").html(today);

$(document).ready(function () {
    var schedules = [];

    // event listener for save button
    $(".saveBtn").on("click", function () {
        var textInput = $(this).siblings(".description").val();
        var timeStamp = $(this).parent().attr("id");

        schedules.push({ description: textInput, time: timeStamp});

       // saves to local storage 
        localStorage.setItem("schedules", JSON.stringify(schedules));
    });

    // checks time of scheduled event compared to current time in order to adjust color scheme
    function currentSchedule() {
        var currentTime = moment().hours();

        $(".time-block").each(function () {
            var scheduleHour = parseInt($(this).attr("id").split("-"[1]));

            if (moment(currentTime).isAfter(scheduleHour, "hour")) {
                $(this).removeClass("future"); 
                $(this).removeClass("present");
                $(this).addClass("past");
            }

            else if (currentTime === scheduleHour) {
                $(this).removeClass("past future");
                $(this).addClass("present");
            }
            else {
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }

        });
    }
    currentSchedule();

    // persistent local storage when page is refreshed
    var storedSchedules = JSON.parse(localStorage.getItem("schedules"));

    if (storedSchedules !== null) {
        schedules = storedSchedules;
    }

    for (var i = 0; i < schedules.length; i++) {
        var userInput = schedules[i].description;
        $("#" + schedules[i].time).children(".description").text(userInput);
    }

})