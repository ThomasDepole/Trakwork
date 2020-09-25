var CreatePlannedTask = new function(){
    var self = this;
    this.elm = $("#CreatePlannedTaskModal");
    this.target = this.elm[0];
    this.isOpen = false;

    //Create the pickers
    this.colorPicker = new ColorPicker( self.elm.find(".colorPicker"), true );
    this.startTimePicker = new StartTimePicker( self.elm.find(".startTime"), 'Deadline', false );
    this.estimate = new EstimatePicker( this.elm.find(".estimate") );
    this.iconPicker = new IconPicker(this.elm.find(".iconPicker"));

    this.elm.find(".modal-footer .btn").hover(function(){
        self.colorPicker.hideOptions();
        self.startTimePicker.hideOptions();
    });

    this.CreateTask = function(){
        var type = this.elm.find('.type-options input[name="tasktype"]').val();
        var name = this.elm.find('input[name=name]').val();
        var colorKey = this.elm.find('input[name="color"]').val();
        var color = $.grep(TaskStyles, function(e){ return e.name == colorKey })[0];
        var resumeID = this.elm.find('input[name="resumeTaskID"]').val();
        var icon = this.elm.find('input[name="icon"]').val();

        var id = StartTask(type, name, $('#StartTaskModal input[name="startTimeValue"]').val(), color, icon);

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

    this.Reset = function(){
        this.elm.find('input[name="goal"]').val("");
        this.elm.find('input[name="resumeTaskID"]').val("");
        this.estimate.Reset();
        this.startTimePicker.clearDate();
        self.colorPicker.setOption("stripe-green");
        self.iconPicker.SelectIcon("fa-file-o");
    }

    this.Hide = function(){
        this.elm.modal("hide");
    }

    this.Show = function(){
        self.Reset();
        self.elm.find('input[name="name"]').addClass("keypress-capture").val("Task");
        if(!self.isOpen)
            self.elm.modal();
    }
}

CreatePlannedTask.elm.on('hidden.bs.modal', function () {
    CreatePlannedTask.isOpen = false;
    CreatePlannedTask.elm.find(".go").removeClass("keypress-enter");
});

CreatePlannedTask.elm.on('shown.bs.modal', function () {
    CreatePlannedTask.isOpen = true;
    CreatePlannedTask.elm.find(".go").addClass("keypress-enter");
});

$("#StartTaskModal .go").click(function(){
    CreatePlannedTask.CreateTask();
});