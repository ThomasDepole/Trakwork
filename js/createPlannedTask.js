var CreatePlannedTaskModal = new function(){
    var self = this;
    this.elm = $("#CreatePlannedTaskModal");
    this.nameField = this.elm.find("[name=name]");
    this.notesField = this.elm.find("[name=notes]");
    this.target = this.elm[0];
    this.isOpen = false;
    this.day = null;
    this.task = null;

    //Create the pickers
    this.colorPicker = new ColorPicker( self.elm.find(".colorPicker"), true );
    this.startTimePicker = new StartTimePicker( self.elm.find(".startTime"), 'Deadline', false );
    this.estimate = new EstimatePicker( this.elm.find(".estimate"), .25);
    this.iconPicker = new IconPicker(this.elm.find(".iconPicker"));

    this.elm.find(".modal-footer .btn").hover(function(){
        self.colorPicker.hideOptions();
        self.startTimePicker.hideOptions();
    });

    this.SaveTask = function(){
        var name = this.elm.find('input[name=name]').val();
        var color = this.elm.find('input[name="color"]').val();
        var icon = this.elm.find('input[name="icon"]').val();
        var notes = this.elm.find('[name="notes"]').val();
        var deadline = this.elm.find("input[name=startTimeValue]").val();
        if(deadline != "")
            deadline = new Date(deadline);
        var estimate = this.estimate.GetValue();
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

        this.Hide();
        self.day.render();
        self.task = null;
    }

    this.Reset = function(){
        self.elm.find('input[name="goal"]').val("");
        self.elm.find('input[name="resumeTaskID"]').val("");
        self.elm.find('[name=notes]').val("");
        self.estimate.Reset();
        self.startTimePicker.clearDate();
        self.colorPicker.setOption("stripe-green");
        self.iconPicker.SelectIcon("fa-file-o");
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
        
        self.estimate.GetValue();
    }

    //focus events
    self.elm.on('shown.bs.modal', function () {
        CreatePlannedTaskModal.isOpen = true;
    });

    //blur events
    self.elm.on('hidden.bs.modal', function () {
        CreatePlannedTaskModal.isOpen = false;
    });

    //keyboard events
    var colorIndex = 0;
    $(this.elm).keydown(function(e){
        //handle enter key
        if(e.key == "Enter"){
            self.SaveTask();
            return;
        }

        //handle free form typing
        if(e.keyCode >= 48 && e.keyCode <= 90){
            if(!self.notesField.is(":focus") && self.nameField.hasClass("has-default-value"))
                self.elm.find("[name=name]").val("").focus().removeClass("has-default-value");
            return;
        }

        //tab to exit notes field
        if(e.key == "Tab" && self.notesField.is(":focus")){
            self.notesField.blur();
            e.preventDefault();
            self.elm.focus();
            return;
        }

        //ignore arrow keys if the notes field or name field is in focus
        if(self.notesField.is(":focus") || self.nameField.is(":focus"))
            return;
        
        //deadline actions
        if(e.key == "ArrowLeft" && !e.shiftKey && !e.altKey)
            self.startTimePicker.increment("--");
        if(e.key == "ArrowLeft" && e.shiftKey && !e.altKey)
                self.startTimePicker.increment("-");

        if(e.key == "ArrowRight" && !e.shiftKey && !e.altKey)
            self.startTimePicker.increment("++");

        if(e.key == "ArrowRight" && e.shiftKey && !e.altKey)
            self.startTimePicker.increment("+");

        //estimate actions
        if(e.key == "ArrowDown" && !e.shiftKey && !e.altKey)
            self.estimate.increment("-");

        if(e.key == "ArrowDown" && e.shiftKey && !e.altKey)
            self.estimate.increment("--");

        if(e.key == "ArrowUp" && !e.shiftKey && !e.altKey)
            self.estimate.increment("+");

        if(e.key == "ArrowUp" && e.shiftKey && !e.altKey)
            self.estimate.increment("++");
            
        //colors
        if(e.key == "ArrowLeft" && e.altKey)
        {
            if(colorIndex == 0)
                colorIndex = self.elm.find(".colorPicker .color-option").length;
            
            colorIndex--;
            var color = $(self.elm.find(".colorPicker .color-option")[colorIndex]).attr("data-colorname");
            self.colorPicker.setOption(color);
            e.preventDefault();
            self.elm.focus();
        }
        if(e.key == "ArrowRight" && e.altKey)
        {
            if(colorIndex == (self.elm.find(".colorPicker .color-option").length - 1))
               colorIndex = -1;
            
            colorIndex++;
            var color = $(self.elm.find(".colorPicker .color-option")[colorIndex]).attr("data-colorname");
            self.colorPicker.setOption(color);
            e.preventDefault();
            self.elm.focus();
        }
    });
}

$("#CreatePlannedTaskModal .go").click(function(){
    CreatePlannedTaskModal.SaveTask();
});