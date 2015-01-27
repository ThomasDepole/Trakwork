// Add default task type
TaskPickerType.AddType("ticket", "Ticket Item", "fa-briefcase", true, true, "Ticket Number", "orange");
TaskPickerType.AddType("generaltask", "Task", "fa-file-o", true, true, "Task Name", "green");
TaskPickerType.AddType("lunch", "Take Lunch", "fa-apple", false, false, "Lunch", "lightblue");
TaskPickerType.AddType("nonbillable", "Non Billable", "fa-exclamation-triangle", false, false, "Non Billable", "red");

var TaskPicker = new function(){
    var _taskpicker = this;
    this.elm = $("#StartTaskModal");
    this.target = this.elm[0];
    this.isOpen = function(){ return (this.elm.hasClass("in")) }
    //Create the pickers
    this.colorPicker = new ColorPicker( $("#StartTaskModal .colorPicker") );
    this.startTimePicker = new StartTimePicker( $("#StartTaskModal .startTime") );
    this.estimate = new EstimatePicker( this.elm.find(".estimate") );



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
        this.elm.find(".type-selector").hide();

        //Colors
        this.colorPicker.setOption(typeObject.color);
        this.Show();
    }

    this.ResumeTaskPicker = function(){
        this.elm.find(".resumetasks-chooser").show();
        this.elm.find(".type-selector").hide();
        this.elm.find(".resume-option").unbind();
        console.log(Tasks);
        for(var i in Tasks){
            if(Tasks[i].link_id == null){
                var html = '<div class="resume-option" data-task="'+i+'">' + Tasks[i].name + '</div>';
                this.elm.find(".resumetasks-chooser").append(html);
            }
        }
        this.elm.find(".resume-option").click(function(){
            _taskpicker.ResumeTaskOptions($(this).attr("data-task"));
        });
        this.Show();
    }

    this.ResumeTaskOptions = function(task_id){
        var type = Tasks[task_id].type;
        var name = Tasks[task_id].name;

        this.elm.find('input[name="name"]').val(name).removeClass("keypress-capture").hide();
        this.elm.find(".type-options .typelabel").html(name);
        this.elm.find('.type-options input[name="tasktype"]').val(type);
        this.elm.find(".resumetasks-chooser, .estimateContainer").hide();
        this.elm.find(".type-options, .modal-footer").show();
        this.elm.find('input[name="resumeTaskID"]').val(task_id);
    }

    this.StartTask = function(){
        var type = this.elm.find('.type-options input[name="tasktype"]').val();
        var name = this.elm.find('input[name=name]').val();
        var colorKey = this.elm.find('input[name="color"]').val();
        var color = $.grep(TaskStyles, function(e){ return e.name == colorKey })[0];
        var resumeID = this.elm.find('input[name="resumeTaskID"]').val();

        var id = StartTask(type, name, $('#StartTaskModal input[name="startTimeValue"]').val(), color);

        SetEstimate(id, this.estimate.GetValue());

        if (resumeID != "")
            Tasks[id].link_id = resumeID;

        $(".task.new .name").html("Change Task");
        $(".task.new").show();
        $(".startday").hide();

        RenderTasks(".tasks");
        RenderDayProgress();
        SaveTasks();
        SaveEstimates();
        this.Hide();
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

    this.Reset = function(){
        this.elm.find(".type-selector").show();
        this.elm.find(".modal-footer,  .type-options,  .resume-option").hide();
        this.elm.find('input[name="goal"]').val("");
        this.elm.find('input[name="resumeTaskID"]').val("");
        this.estimate.Reset();
        var currentDateTime = new Date();
        this.startTimePicker.setStartTime(currentDateTime);
    }

    this.Hide = function(){
        this.elm.modal("hide");
    }

    this.Show = function(){
        if(Tasks.length == 0)
            this.elm.find(".resumetask, .endDay-option").hide();
        else if(Tasks.length == 1){
            this.elm.find(".endDay-option").show();
            this.elm.find(".resumetask").hide();
        }else{
            this.elm.find(".resumetask, .endDay-option").show();
        }


        if(!this.isOpen())
            this.elm.modal();
    }
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

$(".resumetask").click(function(){
    TaskPicker.ResumeTaskPicker();
});

$(".endDay-option").click(function(){
    $(".type-selector").hide();
    $(".endDay-conform").show();
});

$(".endDay-confirm").click(function(){
    $(".endDay-conform").hide();
    TaskPicker.EndDay();
});

$(".endDay-no").click(function(){
    $(".endDay-conform").hide();
    $(".type-selector").show();
    $(".endDay-conform").hide();
});




