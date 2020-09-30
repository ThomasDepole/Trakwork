var AllPlanners = [];

var DayPlanner = function(date){
    var self = this;
    this.date = date;

    //html
    this.container = $($("#DayTemplate").html()).appendTo("#Planner");
    this.html = {};
    this.html.tasks = this.container.find(".plannedTasks");
    this.html.progressBar = this.container.find(".ProgressBar");
    this.html.dayLabel = this.container.find(".dayLabel");
    this.html.msg = this.container.find(".msg");

    this.tasks = function(){
        var tasks = [];

        PlannedTasks.forEach(task => {
            if(TimeCalc.DatesAreOnSameDay(task.date, self.date))
                tasks.push(task);
        })

        return tasks;
    }

    this.render = function(){
        //render tasks
        self.html.tasks.html("");
        self.html.msg.html("");
        self.tasks().forEach(task => {
            self.html.tasks.append(`<div class="task type-generaltask" data-id="${task.id}" style="background: ${task.GetColor().color} ; color: ${task.GetColor().fontcolor} ;">
                                        <div class="icon"><i class="fa ${task.icon}"></i></div>
                                        <div class="name">${task.name}</div>
                                    </div>`)
        });
        self.html.tasks.find("[data-id]").click(function(){
            var id = $(this).attr("data-id");
            var task = $.grep(PlannedTasks, function(e){ return e.id == id })[0];
            CreatePlannedTaskModal.EditTask(self, task);
        });
        self.html.tasks.append(`<div class="task newPlanned" ><div class="icon"><i class="fa fa-plus"></i></div><div class="name">Add Task</div></div>`);
        self.container.find(".newPlanned").click(function(){
            CreatePlannedTaskModal.CreateTask(self);
        });

        var minsInDay = 480; //todo fetch this from settings
        var minsRemaining = minsInDay;
        //render progress bar
        self.html.progressBar.html("");
        self.tasks().forEach(task => {
            var mins = task.estimate * 60;

            if(mins > minsRemaining){
                mins = minsRemaining;
                self.html.msg.append(`<div class="error">You have more tasks than you can complete.</div>`);
            }

            var percentage = (mins / minsInDay) * 100;
            minsRemaining-=mins;

            self.html.progressBar.append(`<div data-id="1" class="type-generaltask" 
                                                           style="width: ${percentage}%; 
                                                           background: ${task.GetColor().color}">
                                        </div>`);
        });

        //render time remaining
        self.html.progressBar.append(`<div class="TimeRemaining">${TimeCalc.TimeLabel_FromMins(minsRemaining)}</div>`);
    }
    this.render();

    //this can be called to render all planners on the page.
    this.renderAllPlanners = function(){
        for(var i=0; i<planners.length; i++)
            AllPlanners[i].render();
    }

    //set day label
    if(TimeCalc.DatesAreOnSameDay(new Date(), date))
        self.html.dayLabel.html("Today")
    else{
        self.html.dayLabel.html(moment(date).format('dddd'));
    }

    //keyboard events
    if(TimeCalc.DatesAreOnSameDay(new Date(), date)){
        $("body").keydown(function(e){
            if(e.key == "Enter")
                CreatePlannedTaskModal.CreateTask(self);
        });
    }

    AllPlanners.push(self);
}

$(".plannedTasks [data-task_id]").click(function(){
    var id = $(this).attr("data-task_id");
    TaskDetails.OpenTask(id);
});

$(function(){
    for(var i = 0; i < 7; i++){
        var date = new Date();
        date.setDate(date.getDate() + i);
        new DayPlanner(date);
    }
});
