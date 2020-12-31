var CreatePlannedTaskModal = new function(){
    var self = this;
    this.elm = $("#CreatePlannedTaskModal");
    this.nameField = this.elm.find("[name=name]");
    this.notesField = this.elm.find("[name=notes]");
    this.completeBtn = this.elm.find(".completeTask");
    this.reopenBtn = this.elm.find(".reopenTask");
    this.target = this.elm[0];
    this.isOpen = false;
    this.day = null;
    this.task = null;

    //Create the pickers
    this.colorPicker = new ColorPicker( self.elm.find(".colorPicker"), true );
    this.startTimePicker = new StartTimePicker( self.elm.find(".startTime"), 'Deadline', false );
    this.estimate = new EstimatePicker( this.elm.find(".estimate"), .25);
    this.iconPicker = new IconPicker(this.elm.find(".iconPicker"));
    this.deadlinePicker = new DeadLinePicker(this.elm.find(".deadlinePicker"), this.estimate, this.colorPicker);

    this.elm.find(".modal-footer .btn").hover(function(){
        self.colorPicker.hideOptions();
        self.startTimePicker.hideOptions();
    });

    this.SaveTask = function(){
        var name = self.elm.find('input[name=name]').val();
        var color = self.elm.find('input[name="color"]').val();
        var icon = self.elm.find('input[name="icon"]').val();
        var notes = self.elm.find('[name="notes"]').val();
        var deadline = self.elm.find("input[name=startTimeValue]").val();
        if(deadline != "")
            deadline = new Date(deadline);
        var estimate = self.estimate.GetValue();
        var date = self.day.date;

        if(self.task != null){
            self.task.name = name;
            self.task.color = color;
            self.task.icon = icon;
            self.task.notes = notes;
            self.task.deadline = deadline;
            self.task.estimate = estimate;
            UpdatePlannedTask(self.task);
        }
        else{
            CreatePlannedTask(name,color,icon,notes,deadline,date,estimate,false);
        }

        self.Hide();
        self.day.render();
        self.task = null;
    }

    this.Reset = function(){
        self.elm.find('input[name="goal"]').val("");
        self.elm.find('input[name="resumeTaskID"]').val("");
        self.elm.find('[name=notes]').val("");
        self.estimate.reset();
        self.deadlinePicker.reset();
        self.startTimePicker.clearDate();
        self.startTimePicker.disable();//not used for planned tasks
        self.colorPicker.setOption("stripe-green");
        self.iconPicker.SelectIcon("fa-file-o");
        self.reopenBtn.hide();
        self.completeBtn.show();
    }

    this.Hide = function(){
        this.elm.modal("hide");
    }

    this.CreateTask = function(dayPlanner){
        if(self.isOpen)
            return;

        self.day = dayPlanner;
        self.Reset();
        self.elm.find('input[name="name"]').val("Start Typing").addClass("has-default-value");
        self.elm.modal();
    }

    this.EditTask = function(dayPlanner, task){
        if(self.isOpen)
            return;

        self.day = dayPlanner;
        self.task = task;
        self.Reset();
        self.elm.modal();

        //prep editor
        self.elm.find('input[name=name]').val(task.name);
        self.colorPicker.setOption(task.color);
        //self.elm.find('input[name="icon"]').val();
        self.elm.find('[name="notes"]').val(task.notes);
        self.estimate.setEstimate(task.estimate);
        if(task.deadline != "")
            self.startTimePicker.setStartTime(task.deadline);
        if(task.completed){
            self.completeBtn.hide();
            self.reopenBtn.show();
        }
        
        self.estimate.GetValue();
    }

    this.DeleteTask = function(){
        if(self.task != null)
            DeletePlannedTask(self.task.id);

        for(var i=0; i<AllPlanners.length; i++)
            AllPlanners[i].render();
    }

    this.completeTask = function(){
        if(self.task != null){
            self.task.completed = true;
            UpdatePlannedTask(self.task);
        }

        self.Hide();
        self.day.render();
        self.task = null;
    }

    this.reopenTask = function(){
        if(self.task != null){
            self.task.completed = false;
            UpdatePlannedTask(self.task);
        }

        self.Hide();
        self.day.render();
        self.task = null;
    }

    //focus events
    self.elm.on('shown.bs.modal', function () {
        CreatePlannedTaskModal.isOpen = true;
    });

    //blur events
    self.elm.on('hidden.bs.modal', function () {
        CreatePlannedTaskModal.isOpen = false;
    });

    self.completeBtn.click(self.completeTask);
    self.reopenBtn.click(self.reopenTask);

    //keyboard events
    new TaskEditorKeyboardEvents(this.elm,this.SaveTask,this.nameField,this.notesField, this.estimate, this.startTimePicker, this.colorPicker);
}

$("#CreatePlannedTaskModal .go").click(function(){
    CreatePlannedTaskModal.SaveTask();
});

$("#CreatePlannedTaskModal .deletePlannedTask").click(function(){
    CreatePlannedTaskModal.DeleteTask();
});