// Add default task type
CreatePickerType("generaltask", "Task", "fa-file-o", true, true, "Task Name", "green");
CreatePickerType("lunch", "Take Lunch", "fa-apple", false, false, "Lunch", "lightblue");
CreatePickerType("nonbillable", "Non Billable", "fa-exclamation-triangle", false, false, "Non Billable", "red");

var TaskPicker = new function(){
    var self = this;
    var _taskpicker = this;
    this.elm = $("#StartTaskModal");
    this.quickPicker = this.elm.find("#QuickTaskPicker");
    this.popup = this.elm.find(".modal-content");

    this.target = this.elm[0];
    this.isOpen = function(){ return (this.elm.hasClass("in")) }

    //Create the pickers
    this.colorPicker = new ColorPicker( $("#StartTaskModal .colorPicker") );
    this.startTimePicker = new StartTimePicker( $("#StartTaskModal .startTime") );
    this.estimate = new EstimatePicker( this.elm.find(".estimate") );
    this.iconPicker = new IconPicker(this.elm.find(".iconPicker"));

    this.elm.find(".modal-footer .btn").hover(function(){
        _taskpicker.colorPicker.hideOptions();
        _taskpicker.startTimePicker.hideOptions();
    });

    this.SelectType = function(type){
        var typeObject = $.grep(TaskPickerTypes, function(e){ return e.type == type; })[0];
        if(typeObject.can_nametask){
            this.elm.find('input[name="name"]').addClass("keypress-capture").show();
            this.elm.find('input[name="name"]').val( "Task " + (Tasks.length + 1) );
        }
        else{
            this.elm.find('input[name="name"]').removeClass("keypress-capture").hide();
            this.elm.find('input[name="name"]').val( typeObject.nametasklabel );
        }
        this.elm.find(".type-options .typelabel").html(typeObject.nametasklabel);
        this.elm.find('.type-options input[name="tasktype"]').val(type);
        this.elm.find(".type-options, .modal-footer").show();
        this.iconPicker.SelectIcon(typeObject.icon);

        //Colors
        this.colorPicker.setOption(typeObject.color);
        this.HideQuickPicker();
    }

    this.PrefillResumeTask = function(task_id){
        var type = Tasks[task_id].type;
        var name = Tasks[task_id].name;
        var plannedId = (Tasks[task_id].plannedTaskId == null) ? "" : Tasks[task_id].plannedTaskId;
        self.colorPicker.setOption(Tasks[task_id].color);

        self.HideQuickPicker();

        self.elm.find('input[name="name"]').val(name).removeClass("keypress-capture").hide();
        self.elm.find(".type-selector, .estimate, .colorPicker, .iconPicker").hide();
        self.elm.find(".type-options .typelabel").html(name);
        self.elm.find('.type-options input[name="tasktype"]').val(type);
        self.elm.find(".type-options, .modal-footer").show();
        self.elm.find('input[name="resumeTaskID"]').val(task_id);
        self.elm.find('input[name="plannedTaskID"]').val(plannedId);
    }

    this.PrefillPlannedTask = function(plannedTaskId){
        var task = $.grep(PlannedTasks, function(e){ return e.id == plannedTaskId })[0];
        self.HideQuickPicker();

        self.elm.find('input[name="name"]').val(task.name).removeClass("keypress-capture").hide();
        self.elm.find(".type-selector").hide();
        self.elm.find(".type-options .typelabel").html(task.name);
        self.elm.find(".type-options, .modal-footer").show();
        self.elm.find('.type-options input[name="tasktype"]').val("planned");
        self.elm.find('input[name="plannedTaskID"]').val(task.id);

        self.colorPicker.setOption(task.GetColor().name);
        self.colorPicker.ShowStripedColors();
        self.iconPicker.SelectIcon(task.icon);
        self.estimate.setEstimate(task.estimate);
    }

    this.StartTask = function(){
        var type = self.elm.find('.type-options input[name="tasktype"]').val();
        var name = self.elm.find('input[name=name]').val();
        var color = self.elm.find('input[name="color"]').val();
        var resumeID = self.elm.find('input[name="resumeTaskID"]').val();
        var plannedID = self.elm.find('input[name="plannedTaskID"]').val();
        var icon = self.elm.find('input[name="icon"]').val();

        var id = StartTask(type, 
                           name, 
                           $('#StartTaskModal input[name="startTimeValue"]').val(), 
                           color, 
                           icon, 
                           self.estimate.GetValue(),
                           resumeID, 
                           plannedID);

        $(".task.new .name").html("Change Task");
        $(".task.new").show();
        $(".startday").hide();

        RenderTasks(".tasks");
        RenderDayProgress();
        SaveTasks();
        SaveEstimates();

        self.Hide();
        return id;
    }

    this.EndDay = function(){
        var color = $.grep(TaskStyles, function(e){ return e.name == "silver" })[0];
        StartTask("endday", "End", new Date(), color);
        RenderTasks(".tasks");
        RenderDayProgress();
        SaveTasks();
        SaveEstimates();
        this.Hide();
    }

    this.Hide = function(){
        this.elm.modal("hide");
    }

    this.Reset = function(){
        if(Tasks.length == 0)
            self.elm.find(".resumetask, .endDay-option").hide();
        else if(Tasks.length == 1){
            self.elm.find(".endDay-option").show();
            self.elm.find(".resumetask").hide();
        }else{
            self.elm.find(".resumetask, .endDay-option").show();
        }

        self.elm.find(".estimate, .colorPicker, iconPicker").show();
        self.elm.find(".modal-footer, .endDay-conform").hide();
        self.elm.find(".type-selector, .estimate, .colorPicker, .iconPicker").show();
        self.elm.find('input[name="goal"]').val("");
        self.elm.find('input[name="resumeTaskID"]').val("");
        self.elm.find('input[name="plannedTaskID"]').val("");
        self.elm.find("[name=name]").addClass("has-default-value");
        self.estimate.Reset();
        self.colorPicker.Reset();
        self.startTimePicker.setStartTime(new Date());

        _taskpicker.RenderQuickOptions();
    }

    this.Show = function(){
        self.Reset();

        if(!this.isOpen())
            this.elm.modal();

        self.ShowQuickPicker();
    }

    this.RenderQuickOptions = function(){
        self.elm.find("#PlannedTaskPicker .task-list").html("");
        PlannedTasks.forEach(task =>{
            if(!TimeCalc.DatesAreOnSameDay(new Date, task.date))
                return;

            //check if this planned task has already been started
            for(var i = 0; i<Tasks.length; i++){
                if(Tasks[i].plannedTaskId == task.id)
                    return;
            }

            self.elm.find("#PlannedTaskPicker .task-list")
                    .append(`<div class="task quickTaskOption" data-type="planned" data-id="${task.id}" style="background: ${task.GetColor().color} ; color: ${task.GetColor().fontcolor} ;">
                                <div class="icon"><i class="fa ${task.icon}"></i></div>
                                <div class="name">${task.name}</div>
                            </div>`);
        });
        
        this.elm.find("#ResumeTaskOptions .task-list").html("");
        for(var i in Tasks){
            if(Tasks[i].link_id == null){
                //var html = '<div class="resume-option" data-task="'+i+'">' + Tasks[i].name + '</div>';
                var html = `<div class="task quickTaskOption" data-type="resume" data-id="${i}" style="background: ${Tasks[i].GetColor().color} ; color: ${Tasks[i].GetColor().fontcolor} ;">
                                <div class="icon"><i class="fa ${Tasks[i].icon}"></i></div>
                                <div class="name">${Tasks[i].name}</div>
                            </div>`;
                this.elm.find("#ResumeTaskOptions .task-list").append(html);
            }
        }
    }

    this.ShowQuickPicker = function(){
        if(!this.isOpen())
            this.elm.modal();

        self.quickPicker.show();
        self.popup.hide();
    }

    this.HideQuickPicker = function(){
        if(!this.isOpen())
            this.elm.modal();

        self.quickPicker.hide();
        self.popup.show();
    }

    //bind click events for quick options
    this.elm.delegate(".quickTaskOption", "click", function(){
        var type = $(this).attr("data-type");
        TaskPicker.HideQuickPicker();
    
        if(type == "endDay"){
            $(".endDay-conform").show();
            return;
        }
    
        if(type == "generalTask"){
            TaskPicker.SelectType("generaltask");
            return;
        }
    
        if(type == "lunch"){
            TaskPicker.SelectType("lunch");
            return;
        }
    
        if(type == "nonBillable"){
            TaskPicker.SelectType("nonbillable");
            return;
        }

        if(type == "resume"){
            var id = $(this).attr("data-id");
            TaskPicker.PrefillResumeTask(id);
            return;
        }

        if(type == "planned"){
            var id = $(this).attr("data-id");
            TaskPicker.PrefillPlannedTask(id);
            return;
        }
    });

    //keyboard events
    new TaskEditorKeyboardEvents(this.elm,this.StartTask,this.elm.find('input[name=name]'), null, this.estimate, this.startTimePicker, this.colorPicker);
}

TaskPicker.elm.on('hidden.bs.modal', function () {
    TaskPicker.elm.find(".go").removeClass("keypress-enter");
});

TaskPicker.elm.on('shown.bs.modal', function () {
    TaskPicker.elm.find(".go").addClass("keypress-enter");
});

// render task types
for(var i in TaskPickerTypes){
    var html = '<div class="type-option task" data-tasktype="'+ TaskPickerTypes[i].type +'"><div class="icon"><i class="fa '+TaskPickerTypes[i].icon+'" ></i></div><div class="name">'+TaskPickerTypes[i].label+'</div></div>';
    $("#StartTaskModal .thetasks").append(html);
}

$(".type-option").click(function(){
    var type = $(this).attr("data-tasktype");
    TaskPicker.SelectType(type);
});

$("#StartTaskModal .go").click(function(){
    TaskPicker.StartTask();
});



$(".endDay-confirm").click(function(){
    $(".endDay-conform").hide();
    TaskPicker.EndDay();
});

$(".endDay-no").click(function(){
    TaskPicker.ShowQuickPicker();
});

//apply styles
$(function(){
    $(".quickTaskOption[data-type=generalTask]").css({
        "background": TaskStyles[0].color,
        "color": TaskStyles[0].fontcolor
    }); 
    
    $(".quickTaskOption[data-type=nonBillable]").css({
        "background": TaskStyles[3].color,
        "color": TaskStyles[3].fontcolor
    }); 

    $(".quickTaskOption[data-type=endDay]").css({
        "background": TaskStyles[8].color,
        "color": TaskStyles[8].fontcolor
    }); 

    $(".quickTaskOption[data-type=lunch]").css({
        "background": TaskStyles[2].color,
        "color": TaskStyles[2].fontcolor
    }); 
});