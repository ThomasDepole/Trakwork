
var MainClock = ".MainClock";
var Tasks = new Array();
var Settings = new Array();
var TaskStyles = new Array();
var DayProgressMax = 480;
var DefaultDayLength = 480;
var icons; //loaded in index TODO find a better way to load these


$(document).ready(function(){
    LoadTasks();
    LoadSettings();
    LoadEstimates();
    RenderEstimates();
});

/* Task Styles */
function GenerateStripeColor(colorDark, colorLight){
    return "repeating-linear-gradient(135deg, "+colorLight+", "+colorLight+" 10px, " + colorDark +" 10px, "+colorDark+" 20px)";
}
TaskStyles.push(new TaskStyle("orange", "#DD6100", "#FFF") );
TaskStyles.push(new TaskStyle("lightblue", "#39B3D7", "#FFF") );
TaskStyles.push(new TaskStyle("green", "#2CB32C", "#FFF") );
TaskStyles.push(new TaskStyle("red", "#990404", "#FFF") );
TaskStyles.push(new TaskStyle("blue", "#0089DD", "#FFF") );
TaskStyles.push(new TaskStyle("purple", "#8300DD", "#FFF") );
TaskStyles.push(new TaskStyle("lightpurple", "#B32C74", "#FFF") );
TaskStyles.push(new TaskStyle("midnightblue", "#003366", "#FFF") );
TaskStyles.push(new TaskStyle("silver", "#B6B6B6", "#FFF") );
TaskStyles.push(new TaskStyle("crimson", "#F95252", "#FFF") );
TaskStyles.push(new TaskStyle("black", "#000000", "#FFF") );
TaskStyles.push(new TaskStyle("yellow", "#EDD320", "#FFF") );
TaskStyles.push(new TaskStyle("stripe-orange", GenerateStripeColor("#DD6100", "#ff9b4d"), "#FFF", true));
TaskStyles.push(new TaskStyle("stripe-lightblue", GenerateStripeColor("#39B3D7", "#95d6ea"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-green", GenerateStripeColor("#2CB32C", "#99e699"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-red", GenerateStripeColor("#990404", "#fc8383"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-blue", GenerateStripeColor("#0089DD", "#80cfff"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-purple", GenerateStripeColor("#8300DD", "#cb80ff"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-lightpurple", GenerateStripeColor("#B32C74", "#e699c2"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-midnightblue", GenerateStripeColor("#003366", "#80bfff"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-silver", GenerateStripeColor("#B6B6B6", "#bfbfbf"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-crimson", GenerateStripeColor("#F95252", "#fb8484"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-black", GenerateStripeColor("#000000", "#bfbfbf"), "#FFF", true) );
TaskStyles.push(new TaskStyle("stripe-yellow", GenerateStripeColor("#EDD320", "#f5e889"), "#FFF", true) );


/** Time Functions **/
Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
};

Date.prototype.subtrackMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() - minutes);
    return this;
};

function getTimeValues(date, astronomical_time){
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(s<10){
        s = "0"+s;
    }
    if(m<10){
        m = "0"+m;
    }

    //change time to non-military if true
    if(astronomical_time == true){
        if(h > 11) a = "pm";
        else a = "am"

        if(h > 12) h = h - 12;
        if(h == 0) h = 12;
    }else
        a = null;

    var time = [ h, m, s, a ];

    return time;
}


function GetDifferenceInHours(start, end){
    laterdate = new Date(start);
    earlierdate = new Date(end);

    var difference = laterdate.getTime() - earlierdate.getTime();

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    var secondsDifference = Math.floor(difference/1000);

    var hours = hoursDifference;
    if(minutesDifference > 0)
        hours += "." + Math.round((minutesDifference/60)*100) ;
    //hours += "." +  Math.round((Math.round((minutesDifference/60)*100) * 4) / 4).toFixed(2);

    return hours;
}

function GetHoursDifference(laterdate,earlierdate) {
    laterdate = new Date(laterdate);
    earlierdate = new Date(earlierdate);

    var difference = laterdate.getTime() - earlierdate.getTime();

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    var secondsDifference = Math.floor(difference/1000);

    //full return
    //return 'difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ';

    return hoursDifference + "hr " + minutesDifference + "m";
}

/*
 function HoursRemaining(){
 var time = null;

 for(var i in Tasks){
 var difference = new Date(Tasks[i].end).getTime() - new Date(Tasks[i].start).getTime();
 time+= difference;
 }

 console.log(new Date(time).getHours());
 }
 */

function gettimespent(id){
    if(Tasks[id].end != null){
        //ended task
        laterdate = new Date(Tasks[id].end);
        earlierdate = new Date(Tasks[id].start);
    }else{
        //current task
        laterdate = new Date();
        earlierdate = new Date(Tasks[id].start);
    }
    return TimeSpent = GetHoursDifference(laterdate,earlierdate);
}

function gethours(id){
    if(Tasks[id].end != null){
        //ended task
        laterdate = new Date(Tasks[id].end);
        earlierdate = new Date(Tasks[id].start);
    }else{
        //current task
        laterdate = new Date();
        earlierdate = new Date(Tasks[id].start);
    }

    return GetDifferenceInHours(laterdate, earlierdate);
}


/** Saving and Loading **/
//Settings
function LoadSettings(){
    setingsStorage = $.parseJSON(localStorage.getItem("settings"));
    SetSetting("DayLength", DefaultDayLength);

    if(setingsStorage != null){
        for(var i in setingsStorage){
            SetSetting(setingsStorage[i].key, setingsStorage[i].value);
        }
    }


    RenderTasks(".Tasks");
    RenderDayProgress();
}
function SaveSettings(){
    localStorage.setItem("settings", JSON.stringify(Settings));
}
//Tasks
function LoadTasks(){
    temp = $.parseJSON(localStorage.getItem("tasks"));
    if(temp != null){
        for(var i in temp){
            Tasks.push(new Task());
            var id = Tasks.length - 1;
            Tasks[id].type =  temp[i].type;
            Tasks[id].name =  temp[i].name;
            Tasks[id].start = temp[i].start;
            Tasks[id].end = temp[i].end;
            Tasks[id].link_id = temp[i].link_id;
            Tasks[id].notes = temp[i].notes;
            if(typeof temp[i].color == "undefined" )
                Tasks[id].color = $.grep(TaskStyles, function(e){ return e.name == "silver" })[0];
            else
                Tasks[id].color = temp[i].color;

            if(typeof temp[i].icon == "undefined" )
                Tasks[id].icon = "fa-exclamation";
            else
                Tasks[id].icon = temp[i].icon;
        }
        $(".task.new .name").html("Change Task");
    }

    RenderTasks(".Tasks");
    RenderDayProgress();
}

function SaveTasks(){
    console.log("saved" + Tasks);
    for(var i = 0; Tasks.length > i; i++){
        var endDate = getTimeValues(new Date(Tasks[i].end));
        //console.log(Tasks[i].name + " = " + endDate[0] + ":" + endDate[1]);
    }
    localStorage.setItem("tasks", JSON.stringify(Tasks));
}
//Styles
function LoadTaskStyles(){
   console.error("Remove load task styles reference");
}
function SaveTaskStyles(){
    localStorage.setItem("taskstyles", JSON.stringify(TaskStyles));
}
//Estimates
function SaveEstimates(){
    localStorage.setItem("estimates", JSON.stringify(Estimates));
}
function LoadEstimates(){
    estimateStorage = $.parseJSON(localStorage.getItem("estimates"));

    if(estimateStorage != null){
        for(var i in estimateStorage){
            Estimate.Add(estimateStorage[i].task_id, estimateStorage[i].hours);
        }
    }
    RenderDayProgress();
}

/** Rendering **/
function RenderTasks(selector){
    $(".tasks .task").unbind();
    $(selector).html("");

    for(var i in Tasks){
        var t = Tasks[i];
        var color = t.color;
        var icon = t.icon;
        //Link Overrides
        if(t.link_id != null){
            color = Tasks[t.link_id].color;
            icon =  Tasks[t.link_id].icon;
        }


        var div = '<div class="task type-'+ t.type+'" data-task_id="'+ i +'" style="background: '+ color.color+' ; color: '+ color.fontcolor +' ;" ><div class="icon"><i class="fa '+ icon +'"></i></div><div class="name">'+ t.name +'</div></div>';
        $(selector).append(div);
    }

    $(".tasks .task").click(function(){
        var id = $(this).attr("data-task_id");
        TaskDetails.OpenTask(id);
    });
}

function RenderDayProgress(){
    $(".DayProgress").html("");
    if(Tasks != null){
        var allprogress = null;
        var maxhour = parseInt(GetSetting("DayLength"));

        for(var i in Tasks){
            if(Tasks[i].end != null)  laterdate = new Date(Tasks[i].end);
            else  laterdate = new Date();
            earlierdate = new Date(Tasks[i].start);
            if(Tasks[i].type == "lunch" || Tasks[i].type == "nonbillable"){
                //adds time to day because this task doesn't count against work
                var diff = laterdate.getTime() - earlierdate.getTime();
                var mins = Math.floor(diff/1000/60);
                maxhour += mins;
            }
        }

        for(var i in Tasks){
            var taskstate = null;

            // determins if task is ended or current (last task doesn't have an end time)
            if(Tasks[i].end != null){
                //ended task
                laterdate = new Date(Tasks[i].end);
                earlierdate = new Date(Tasks[i].start);
                taskstate = "endedtask";
            }else{
                //current task
                laterdate = new Date();
                earlierdate = new Date(Tasks[i].start);
                taskstate = "currenttask";
            }

            var diff = laterdate.getTime() - earlierdate.getTime();
            var mins = Math.floor(diff/1000/60);
            var width = (mins / maxhour) *100 ;

            //check if current task is over full work day
            preProgressTotal = allprogress;
            allprogress += width;
            if(allprogress >= 100){
                width = 100 - preProgressTotal;
                RenderDayReport();
            }

            if(Tasks[Tasks.length - 1].type == "endday"){
                width = 100 - preProgressTotal;
                $(".task.new").hide();
                RenderDayReport();
            }

            var style = "";

            if(GetSetting("ProgressBarStyle") == "detailed"){
                if(Tasks[i].link_id != null)
                    style = 'background:' + Tasks[Tasks[i].link_id].color.color;
                else
                    style = 'background:' + Tasks[i].color.color;

            }


            $(".DayProgress").append('<div data-task_id="'+ i +'"   class="type-'+ Tasks[i].type+ ' '+taskstate+'"  style="width: '+width+'%; '+style+'"></div>');

        }

        if(Tasks.length != 0){
            var daystart = Tasks[0].StartTime();
            $(".progress-times").html("");
            $(".progress-times").append('<div style="float:left;"> '+daystart+' </div> ');
        }

        if (Tasks.length != 0){
            daystart = new Date(Tasks[0].start);
            var endtime = new Date(daystart.getTime() + maxhour*60000);
            var time = getTimeValues(new Date(endtime), true);
            var html = '' + time[0] + ':' + time[1] + time[3];
            $(".progress-times").append('<div style="float:right;"> '+html+' </div> ');

        }

        $(".DayProgress div").hover(
            function(){
                var ticket = $(this).attr("data-task_id");
                $(".tasks").find("[data-task_id='" + ticket + "']").addClass("blur");
            },
            function(){
                var ticket = $(this).attr("data-task_id");
                $(".tasks").find("[data-task_id='" + ticket + "']").removeClass("blur");
            }
        );

        $(".DayProgress div").click(function(){
            var ticket = $(this).attr("data-task_id");
            $(".tasks").find("[data-task_id='" + ticket + "']").trigger("click");
        });
    }
}

function RenderDayReport(){
    var elm = ".dayReport";
    var html = '<table class="table"><thead><tr><th>#</th><th>Name</th><th>Start Time</th><th>End Time</th><th>Time Spent</th><th>In Hours</th></tr></thead><tbody>';
    var colCount = 0;
    var linkedtaskshtml = "";
    var linkedCount = 1;
    var totalhours = null;

    for(var i in Tasks){

        if(Tasks[i].link_id == null){
            colCount += 1;
            totalhours += parseFloat(gethours(i));
            var singleTaskhour = gethours(i);

            //get linked tasks
            for(var r in Tasks){
                if(Tasks[r].link_id == i){
                    linkedCount += 1;
                    totalhours += parseFloat(gethours(r));
                    linkedtaskshtml += '<tr> <td> '+Tasks[r].name+' </td> <td> '+Tasks[r].StartTime()+' </td> <td> '+Tasks[r].EndTime()+' </td> <td>'+gettimespent(r)+' </td> <td></td></tr> ';
                }
            }

            // add total hours row if linked exsists
            if(linkedtaskshtml != ""){
                linkedCount += 1;
                singleTaskhour = ""; //remove hour for single task
                linkedtaskshtml += '<tr>  <td colspan="4">Total Hours for '+Tasks[i].name+'</td> <td>' + totalhours  /*  Math.round((totalhours/60)*100) */  + '</td></tr>';
            }

            if(Tasks[i].type != "endday"){
                //add col for single tasks AND first of linked
                html += '<tr> <td rowspan="'+linkedCount+'" > '+colCount+' </td> <td> '+Tasks[i].name+' </td> <td> '+Tasks[i].StartTime()+' </td> <td> '+Tasks[i].EndTime()+' </td> <td>'+gettimespent(i)+' </td> <td>'+ singleTaskhour +'</td> </tr> ';
            }else{
                var TotalDayHours = 0;
                //Calculate Total Hours
                for(var e in Tasks){
                    if(Tasks[e].type != "endday")
                        TotalDayHours += parseFloat(gethours(e));
                }
                //Add End Day
                html += '<tr class="endday"> <td > '+colCount+' </td> <td> '+Tasks[i].name+' </td> <td> '+Tasks[i].StartTime()+' </td> <td>  </td> <td> </td> <td>'+ TotalDayHours.toFixed(2) +'</td> </tr> ';
            }


            // add linked tasks
            html += linkedtaskshtml;

            //clear counters
            totalhours = null;
            linkedtaskshtml = "";
            linkedCount = 1;
        }


    }

    html += '</tbody></table>';
    $(elm).html(html);
}

function RenderEstimates(){
    var RenderArea = ".Estimates";
    $(RenderArea).html("");  //Clear Render Area

    //If esitamtes exists, render progress bars
    if(Estimates.length > 0){
        $(RenderArea).append("<h4> Goals </h4>");

        for(var i in Estimates){
            var est = Estimates;
            var bar = 'div[data-task="'+est[i].task_id+'"].EstimateProgress.ProgressBar';
            var taskName = Tasks[est[i].task_id].name;
            var T = est[i].task_id; //Task Id
            var timeEstimate = est[i].hours;
            var timeSpent = 0;

            timeSpent = TimeCalc.Diff_InSeconds(Tasks[T].StartDate(), Tasks[T].EndDate());

            //get time spent on linked tasks
            for(l in Tasks){
                if(Tasks[l].link_id == T){
                    timeSpent += TimeCalc.Diff_InSeconds(Tasks[l].StartDate(), Tasks[l].EndDate());
                }
            }

            var width = (timeSpent / (timeEstimate*3600)) * 100;
            var status = "OK";
            if(width > 50) status = "Notice";
            if(width > 75) status = "Warning";

            $(RenderArea).append('<div class="EstimateProgress ProgressBar '+status+'" data-task="'+ est[i].task_id +'" > </div>');
            $(bar).append('<div class="EstimateLabel"> '+taskName+' </div> ');
            $(bar).append('<div class="Progress" style="width:'+width+'%;" ></div>')

            //Add time remaining
            var timeRemaining = parseInt(((timeEstimate*3600) - timeSpent) / 60);
            if (timeRemaining < 60){
                $(bar).append('<div class="TimeRemaining"> ' + timeRemaining + 'm </div>');
            }


            switch(status){
                case "Notice" :
                    var id = "estimate" + i + "_warning";
                    AlertUser(id, "Notice, you are half way done with " + taskName);
                    break;
                case "Warning" :
                    var id = "estimate" + i + "_danger";
                    AlertUser(id, "Warning, you are almost out of time! with " + taskName);
                    break;
            }

        }
    }
}


var Alerts = new Array();
function AlertUser(id, message, priority){

    if($.inArray( id, Alerts ) == -1){
        Alerts.push(id);
        alert(message);
    }

}

function ClearDay(){
    Tasks = new Array();
    Estimates = new Array();
    RenderTasks(".tasks");
    RenderDayProgress();
    $(".dayReport").html("");
    $(".progress-times").html("");
    $(".task.new").show();
}


////////////////////////////////////////////
//  Settings 
function Setting(key, value){
    this.key = key;
    this.value = value;
}

function SetSetting(key, value){
    var count = 0;
    for(var i in Settings){
        if(Settings[i].key == key){
            Settings[i].value = value;
            count++;
        }
    }

    if(count == 0){
        Settings.push(new Setting(key, value));
    }
    SaveSettings();
}

function GetSetting(key){
    var value
    for(var i in Settings){
        if(Settings[i].key == key){
            value = Settings[i].value;
        }
    }
    if(typeof value == "undefined")
        value = null;

    return value;
}
///////////////////////////


//////////////////////////////////
// Task Object and functions
function Task(type, name, link_id, start_time, color, icon){
    this.type = type;
    this.name = name;
    this.start = start_time;
    this.end = null;
    this.link_id = link_id;
    this.notes = null;
    this.color = color;
    this.icon = icon;

    this.StartTime = function(){
        var date = new Date(this.start);
        var time = getTimeValues(date, true);
        var html = '' + time[0] + ':' + time[1] + time[3];
        return html
    }

    this.EndTime = function(){
        if(this.end != null){
            var date = new Date(this.end);
            var time = getTimeValues(date, true);
            var html = '' + time[0] + ':' + time[1] + time[3];
            return html
        }else{
            return "active";
        }
    }

    this.StartDate = function(){
        return new Date(this.start);
    }

    this.EndDate = function(){
        if(this.end != null)
            return new Date(this.end);//ended task
        else
            return new Date(); //current task
    }
}


function StartTask(type, name, startTime, color, icon){
    if(typeof startTime == "undefined")
        startTime = Date.now();
    else
        startTime = new Date(startTime).getTime();

    if(Tasks.length > 0)
        Tasks[Tasks.length - 1].end = startTime;

    if(typeof icon == "undefined")
        icon = "fa-file-o";

    var id = Tasks.push( new Task(type, name, null, startTime, color, icon));
    id = id - 1;
    return id
}

/////////////////////////////

////////////////////////////////////////
// Task Styles

function TaskStyle(name, color, fontcolor, isStriped){
    this.name = name;
    this.color = color;
    this.fontcolor = fontcolor;
    this.isStriped = isStriped;
}

//////////////////////////////////////
//Estimate 
var Estimates = new Array();
function Estimate(task_id, hours){
    this.task_id = task_id;
    this.hours = hours;
}

Estimate.Add = function(task_id, hours){
    var id = Estimates.push( new Estimate(task_id, hours) );
    return id;
}

var SetEstimate = function(task_id, hours){
    for(i in Estimates){
        if(Estimates[i].task_id == task_id){
            if(hours <= 0)
                Estimates.splice(i, 1);
            else
                Estimates[i].hours = hours;

            SaveEstimates();
            RenderEstimates();
            return;
        }
    }
    if(hours <= 0) return;
    Estimates.push( new Estimate(task_id, hours) );
    SaveEstimates();
    RenderEstimates();
}

/////////////////////////////////////
//Task Picker
var TaskPickerTypes = new Array();

function TaskPickerType(){
    this.type = null;
    this.label = null;
    this.icon = null;
    this.billable = null;
    this.can_nametask = null;
    this.nametasklabel = null
    this.color = null;
}

TaskPickerType.AddType = function(type, label, icon, billable, can_nametask, nametasklabel, color){
    var id = TaskPickerTypes.push( new TaskPickerType());
    id = id - 1;
    TaskPickerTypes[id].type = type;
    TaskPickerTypes[id].label = label;
    TaskPickerTypes[id].icon = icon;
    TaskPickerTypes[id].billable = billable;
    TaskPickerTypes[id].can_nametask = can_nametask;
    TaskPickerTypes[id].nametasklabel = nametasklabel;
    TaskPickerTypes[id].color = color;
}
/////////////////////////


///////////////////////////////////
//Time Calculator Object 
var TimeCalc = new function TimeCalculator(){
    this.TimeSpentOnTask_InHours =  function(task_id){
        if(Tasks[task_id].end != null){
            //ended task
            laterdate = new Date(Tasks[task_id].end);
            earlierdate = new Date(Tasks[task_id].start);
        }else{
            //current task
            laterdate = new Date();
            earlierdate = new Date(Tasks[task_id].start);
        }

        return GetDifferenceInHours(laterdate, earlierdate);
    }

    this.Diff_InSeconds = function(startDate, endDate){
        var difference = this.GetDifference(startDate, endDate);
        return Math.floor(difference/1000);
    }

    this.GetDifference = function(startDate, endDate){
        laterdate = new Date(startDate);
        earlierdate = new Date(endDate);

        return earlierdate.getTime() - laterdate.getTime();
    }
}

//Interval
setInterval(function(){
    var time = getTimeValues(new Date(), true);
    var html = '<div class="time">' + time[0] + ':' + time[1] + time[3] +'</div><div class="sec">' + time[2] + '</div>';

    $(MainClock).html(html);
}, 1000);

setInterval(function(){
    RenderEstimates();
}, 5000);

setInterval(function(){
    RenderDayProgress();
}, 60000);
