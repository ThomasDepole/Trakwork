var dayPlanner = function(date){
    var self = this;
    this.date = date;
    this.tasks = PlannedTasks;

    //html
    this.container = $($("#DayTemplate").html()).appendTo("#Planner");
    this.html = {};
    this.html.tasks = this.container.find(".plannedTasks");
    this.html.progressBar = this.container.find(".ProgressBar");
    
    

    this.render = function(){
        //render tasks
        self.html.tasks.html("");
        self.tasks.forEach(task => {
            self.html.tasks.append(`<div class="task type-generaltask" data-id="${task.id}" style="background: ${task.GetColor().color} ; color: ${task.GetColor().fontcolor} ;">
                                        <div class="icon"><i class="fa ${task.icon}"></i></div>
                                        <div class="name">${task.name}</div>
                                    </div>`)
        });
        self.html.tasks.append(`<div class="task newPlanned" ><div class="icon"><i class="fa fa-plus"></i></div><div class="name">Add Task</div></div>`);
        this.container.find(".newPlanned").click(function(){
            CreatePlannedTaskModal.Show(self);
        });

        var minsInDay = 480; //todo fetch this from settings
        var minsRemaining = minsInDay;
        //render progress bar
        self.html.progressBar.html("");
        self.tasks.forEach(task => {
            var mins = task.estimate * 60;
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
}

var day = new dayPlanner(new Date());

$(".plannedTasks [data-task_id]").click(function(){
    var id = $(this).attr("data-task_id");
    TaskDetails.OpenTask(id);
});