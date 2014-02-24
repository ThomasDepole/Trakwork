
var MainClock = ".MainClock";

var Tasks = new Array();

var Settings = new Array();

var TaskStyles = new Array();

var DayProgressMax = 480;

var DefaultDayLength = 480;



$(document).ready(function(){

	LoadTasks();

	LoadSettings();

	LoadTaskStyles();

});





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

		if(h == 0) h = 1;

	}else

		a = null;

	

	var time = [ h, m, s, a ];

	

	return time;

}



function GetDifferenceInHours(start, end){

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



function HoursRemaining(){

	var time = null;

	

	for(var i in Tasks){

		var difference = new Date(Tasks[i].end).getTime() - new Date(Tasks[i].start).getTime();

		time+= difference;

	}

	

	console.log(new Date(time).getHours());

}



function SaveTasks(){

	console.log("saved" + Tasks);

	localStorage.setItem("tasks", JSON.stringify(Tasks));

}



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



function LoadTasks(){

	temp = $.parseJSON(localStorage.getItem("tasks"));

	if(temp != null){

		for(var i in temp){

			var id = StartTask();

			Tasks[id].type =  temp[i].type;

			Tasks[id].name =  temp[i].name;

			Tasks[id].start = temp[i].start;

			Tasks[id].end = temp[i].end;

			Tasks[id].link_id = temp[i].link_id;

			Tasks[id].notes = temp[i].notes;

		}

		$(".task.new .name").html("Change Task");

	}

	RenderTasks(".Tasks");

	RenderDayProgress();

}



function RenderTasks(selector){

	$(selector).html("");

	

	for(var i in Tasks){

		

		var icon = null;

		switch(Tasks[i].type){

			case "jira" : icon = "fa-briefcase"; break;

			case "lunch" : icon = "fa-apple"; break;

			case "nonbillable" : icon = "fa-exclamation-triangle"; break;

			case "generaltask" : icon = "fa-file-o"; break;

			case "endday" : icon = "fa-beer"; break;

			

		}

		var div = '<div class="task type-'+Tasks[i].type+'" data-task_id="'+ i +'"><div class="icon"><i class="fa '+ icon +'"></i></div><div class="name">'+ Tasks[i].name +'</div></div>';

	

		$(selector).append(div);

	}

	LoadTaskStyles();

	//$.cookie("tasks",JSON.stringify(Tasks));

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

				

			$(".DayProgress").append('<div data-task_id="'+ i +'" class="type-'+ Tasks[i].type+ ' '+taskstate+'"  style="width: '+width+'%;"></div>');	

				

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

	

	for(var i in Tasks){

		

		if(Tasks[i].link_id == null){

			colCount += 1;

			totalhours += parseFloat(gethours(i));

			singleTaskhour = gethours(i);

			

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

				html += '<tr class="endday"> <td > '+colCount+' </td> <td> '+Tasks[i].name+' </td> <td> '+Tasks[i].StartTime()+' </td> <td>  </td> <td> </td> <td>'+ TotalDayHours +'</td> </tr> ';

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





function ClearDay(){

	Tasks = new Array();

	RenderTasks(".tasks");

	RenderDayProgress();

	$(".dayReport").html("");

	$(".progress-times").html("");
	
	$(".task.new").show();

	//SaveTasks();

}



function Task(type, name, link_id){

	this.type = type;

	this.name = name;

	this.start = Date.now();

	this.end = null;

	this.link_id = link_id;

	this.notes = null;

}



function Setting(key, value){

	this.key = key;

	this.value = value;

}



function TaskStyle(type, color, fontcolor){

	this.type = type;

	this.color = color;

	this.fontcolor = fontcolor;

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

	for(var i in Settings){

		if(Settings[i].key == key){

			return Settings[i].value;

		}

	}

}



function SaveSettings(){

	localStorage.setItem("settings", JSON.stringify(Settings));

}



Task.prototype.StartTime = function(){

	var date = new Date(this.start);

	var time = getTimeValues(date, true);

	var html = '' + time[0] + ':' + time[1] + time[3];

	return html

}



Task.prototype.EndTime = function(){

	if(this.end != null){

		var date = new Date(this.end);

		var time = getTimeValues(date, true);

		var html = '' + time[0] + ':' + time[1] + time[3];

		return html

	}else{

		return null;

	}

}



function StartTask(type, name){

	var id = Tasks.push( new Task(type, name, null));

	id = id - 1;

	return id

}



function EndTask(id){

	Tasks[id].end = Date.now();

	return true;

}



function ResumeTask(id){

	var old = Tasks[id];

	return Tasks.push( new Task(old.type, old.name, id)  );

}



function LoadTaskStyles(){

	TaskStyles = new Array();

	

	//Defauts

	TaskStyles.push(new TaskStyle("jira", "#DD6100", "#FFF") );

	TaskStyles.push(new TaskStyle("lunch", "#39B3D7", "#FFF") );

	TaskStyles.push(new TaskStyle("generaltask", "#2CB32C", "#FFF") );

	TaskStyles.push(new TaskStyle("nonbillable", "#990404", "#FFF") );

	

	

	for(var i in TaskStyles){

		//set box styles

		$(".tasks .task.type-" + TaskStyles[i].type).css({

    		"background-color": TaskStyles[i].color,

			"color": TaskStyles[i].fontcolor

  		});

	}

	

	

	TaskStylesStorage = $.parseJSON(localStorage.getItem("taskstyles"));

	

	if(TaskStylesStorage != null){

		for(var i in TaskStylesStorage){

			var count = 0;

			for(var x in TaskStyles){

				if(TaskStyles[x].type == TaskStylesStorage[i].type){

					TaskStyles[x].color = TaskStylesStorage[i].color;

					TaskStyles[x].fontcolor = TaskStylesStorage[i].fontcolor;

					count++;

				}

			}

			

			if(count == 0){

				TaskStyles.push(new TaskStyle(TaskStylesStorage[i].type, TaskStylesStorage[i].color, TaskStylesStorage[i].fontcolor) );

			}

		}

	}

}



function SaveTaskStyles(){

	localStorage.setItem("taskstyles", JSON.stringify(TaskStyles));

}





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



TaskPickerType.AddType = function(type, label, icon, billable, can_nametask, nametasklabel){

	var id = TaskPickerTypes.push( new TaskPickerType());

	id = id - 1;

	TaskPickerTypes[id].type = type;

	TaskPickerTypes[id].label = label;

	TaskPickerTypes[id].icon = icon;

	TaskPickerTypes[id].billable = billable;

	TaskPickerTypes[id].can_nametask = can_nametask;

	TaskPickerTypes[id].nametasklabel = nametasklabel;

}





//Interval



setInterval(function(){

	var time = getTimeValues(new Date(), true);

	var html = '<div class="time">' + time[0] + ':' + time[1] + time[3] +'</div><div class="sec">' + time[2] + '</div>';


	$(MainClock).html(html);

}, 1000);





/*

setInterval(function(){

	SaveTasks();

}, 10000);

*/



setInterval(function(){

	RenderDayProgress();

}, 60000);





