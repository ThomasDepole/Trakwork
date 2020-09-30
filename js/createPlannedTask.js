var CreatePlannedTaskModal = new function(){
    var self = this;
    this.elm = $("#CreatePlannedTaskModal");
    this.target = this.elm[0];
    this.isOpen = false;
    this.day = null;

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
        var color = this.elm.find('input[name="color"]').val();
        var icon = this.elm.find('input[name="icon"]').val();
        var notes = this.elm.find('[name="notes"]').val();
        var deadline = this.elm.find("input[name=startTimeValue]").val();
        var estimate = this.estimate.GetValue();
        var date = new Date();

        var plan = CreatePlannedTask(name,color,icon,notes,deadline,date,estimate,false);

        this.Hide();
        self.day.render();
        return plan.id;
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

    this.Show = function(dayPlanner){
        self.day = dayPlanner;
        self.Reset();
        self.elm.find('input[name="name"]').addClass("keypress-capture").val("Task");
        if(!self.isOpen)
            self.elm.modal();
    }

    //focus events
    self.elm.on('shown.bs.modal', function () {
        CreatePlannedTaskModal.isOpen = true;
        CreatePlannedTaskModal.elm.find(".go").addClass("keypress-enter");
    });

    //blur events
    self.elm.on('hidden.bs.modal', function () {
        CreatePlannedTaskModal.isOpen = false;
        CreatePlannedTaskModal.elm.find(".go").removeClass("keypress-enter");
    });
}

$("#CreatePlannedTaskModal .go").click(function(){
    CreatePlannedTaskModal.CreateTask();
});