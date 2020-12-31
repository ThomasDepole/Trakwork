var ColorPicker = function(elm, strippedColors){
    var _colorPicker = this;
    var showStripe = (typeof strippedColors !== 'undefined') ? strippedColors : false;
    elm.addClass("propertyPicker colorPicker unselectable")

    //add the picker html
    elm.html('<div class="inputBoxLabel">Color</div><input type="text" name="colorPreview"><input type="hidden" name="color"><div class="options"></div>');

    elm.delegate(".color-option", "click", function(){
        var colorName = $(this).attr("data-colorName");
        _colorPicker.setOption(colorName);
    });

    this.ShowStripedColors = function(){
        elm.find(".options").html("");
        // render colors
        for(var i in TaskStyles){
            //determine if we are displaying striped or non stripped colors
            if(TaskStyles[i].isStriped == showStripe)
                continue;

            elm.find(".options").append(`<div class="color-option" data-colorName="${TaskStyles[i].name}" style="background: ${TaskStyles[i].color} ;"></div>`);
        }
    }

    this.ShowSolidColors = function(){
        elm.find(".options").html("");
        // render colors
        for(var i in TaskStyles){
            //determine if we are displaying striped or non stripped colors
            if(TaskStyles[i].isStriped != showStripe)
                continue;

            elm.find(".options").append(`<div class="color-option" data-colorName="${TaskStyles[i].name}" style="background: ${TaskStyles[i].color} ;"></div>`);
        }
    }
    this.ShowSolidColors();

    this.setOption  = function(name){
        var style = $.grep(TaskStyles, function(e){ return e.name == name; })[0];
        elm.find('input[name="color"]').val(style.name)
        elm.find('input[name="colorPreview"]').css("background", style.color);
    }

    this.reset = function(){
        _colorPicker.setOption("green");
        _colorPicker.ShowSolidColors();
    }

    this.showOptions = function(){
        elm.find(".options").show();
        HideOnMouseLeave(elm, _colorPicker.hideOptions, 600);
    }

    this.hideOptions = function(){
        elm.find(".options").fadeOut();
    }

    this.GetValue = function(){
        var styleName = elm.find('input[name="color"]').val();
        return $.grep(TaskStyles, function(e){ return e.name == styleName; })[0];
    }

    this.disable = function(){
        elm.find(".inputBoxLabel, [name=colorPreview]").hide();
    }

    this.enable = function(){
        elm.find(".inputBoxLabel, [name=colorPreview]").show();
    }

    //bind the click handler
    elm.click(function(){
        _colorPicker.showOptions();
    });
}

var StartTimePicker = function(elm, label, restrictDate){
    //default
    if(typeof label === 'undefined')
        label = "Start Time";
    if(typeof restrictDate === 'undefined')
        restrictDate = true;

    var _startTimePicker = this;
    elm.addClass("propertyPicker startTimePicker unselectable");
    elm.html('<div class="inputBoxLabel startTimeLabel">'+label+'</div><input type="text" name="startTimeDisplay"><input type="hidden" name="startTimeValue"><div class="options"><button class="btn decrease2"><<</button><button class="btn decrease"><</button><button class="btn increase">></button><button class="btn increase2">>></button></div>');

    this.showOptions = function(){
        elm.find(".options").show();
        HideOnMouseLeave(elm, _startTimePicker.hideOptions, 600);
    }

    this.hideOptions = function(){
        elm.find(".options").fadeOut();
    }

    //bind the click handler
    elm.click(function(){
        _startTimePicker.showOptions();
    });

    //The start time logic
    this.setStartTime = function(date){
        if(date == "")
            date = new Date();
        if(typeof date === "string")
            date = new Date(date);

        var now = new Date();
        elm.find('.btn').removeClass("disabled");

        if(restrictDate){
            if(Tasks.length > 0){
                var lastTaskStart = function() { return new Date(Tasks[Tasks.length - 1].start); }
    
                if(date.getTime() <= lastTaskStart().getTime()){
                    date = lastTaskStart().addMinutes(1);
                    elm.find(".decrease, .decrease2").addClass("disabled");
                }
            }
    
            if(date.getTime() > now.getTime()){
                date = now;
                elm.find(".increase, .increase2").addClass("disabled");
            }
        }
        
        var timeValues = getTimeValues(date , true);
        elm.find('input[name="startTimeDisplay"]').val(timeValues[0] + ":" + timeValues[1] + " " + timeValues[3]);
        elm.find('input[name="startTimeValue"]').val(date);
    }
    this.setStartTime(new Date());

    this.clearDate = function(){
        elm.find('input[name="startTimeDisplay"]').val("none");
        elm.find('input[name="startTimeValue"]').val("");
    }

    var currentDate = function() {  
        var date = elm.find('input[name="startTimeValue"]').val();
        if(date == "")
            date = new Date();

        return date;
    }

    this.increment = function(direction){
        var newTime = new Date(currentDate());

        if(direction == "+")
           newTime = newTime.addMinutes(1);
        if(direction == "++")
            newTime = newTime.addMinutes(30);
        if(direction == "-")
            newTime = newTime.subtrackMinutes(1);
        if(direction == "--")
            newTime = newTime.subtrackMinutes(30);

        _startTimePicker.setStartTime(newTime);
    }

    this.disable = function(){
        elm.find(".inputBoxLabel, [name=startTimeDisplay]").hide();
    }

    this.enable = function(){
        elm.find(".inputBoxLabel, [name=startTimeDisplay]").show();
    }

    elm.find(".increase").click(function(){
        _startTimePicker.increment("+");
    });
    elm.find(".increase2").click(function(){
        _startTimePicker.increment("++");
    });

    elm.find(".decrease").click(function(){
        _startTimePicker.increment("-");
    });

    elm.find(".decrease2").click(function(){
        _startTimePicker.increment("--");
    });
}

var EstimatePicker = function(elm, minValueInHours){
    var _estimatePicker = this;
    elm.addClass("propertyPicker estimatePicker unselectable");
    elm.html('<div class="inputBoxLabel estimatelabel">Estimate</div><input type="text" name="estimateDisplay"/><div class="options"><button class="btn decrease2"><<</button><button class="btn decrease"><</button><button class="btn increase">></button><button class="btn increase2">>></button></div>');
    this.estimate = 0;

    this.setEstimate = function(value){
        if(value < 0)
            value = 0;

        if(typeof minValueInHours === "number" && value < minValueInHours)
            value = minValueInHours;

        this.estimate = value;

        var h =  moment.duration(value, "hours").hours();
        var m = moment.duration(value, "hours").minutes();
        elm.find('input[name=estimateDisplay]').val(h + "h " + m + "m");
    }

    this.hideOptions = function(){
        elm.find(".options").hide();
    }

    this.showOptions = function(){
        elm.find(".options").show();
        HideOnMouseLeave(elm, _estimatePicker.hideOptions, 600);
    }

    this.reset = function(){
        if(typeof minValueInHours === "number")
            this.setEstimate(minValueInHours);
        else
            this.setEstimate(0);
    }

    this.GetValue = function(){
        return this.estimate;
    }

    this.disable = function(){
        elm.find(".inputBoxLabel, [name=estimateDisplay]").hide();
    }

    this.enable = function(){
        elm.find(".inputBoxLabel, [name=estimateDisplay]").show();
    }

    //bind the click handler
    elm.click(function(){
        _estimatePicker.showOptions();
    });

    this.increment = function(direction){
        if(direction == "+")
            _estimatePicker.setEstimate(_estimatePicker.estimate + .25);
        if(direction == "++")
            _estimatePicker.setEstimate(_estimatePicker.estimate + .50);
        if(direction == "-")
            _estimatePicker.setEstimate(_estimatePicker.estimate - .25);
        if(direction == "--")
            _estimatePicker.setEstimate(_estimatePicker.estimate - .50);
    }

    elm.find(".increase").click(function(){
        _estimatePicker.increment("+");
    });
    elm.find(".increase2").click(function(){
        _estimatePicker.increment("++");
    });

    elm.find(".decrease").click(function(){
        _estimatePicker.increment("-");
    });

    elm.find(".decrease2").click(function(){
        _estimatePicker.increment("--");
    });
}

var IconPicker = function(elm){
    var _iconPicker = this;
    elm.addClass("propertyPicker iconPicker unselectable");

    elm.html('<div class="inputBoxLabel">Icon</div> <div class="iconDisplay fa" ></div> <input type="hidden" name="icon">');

    elm.click(function(){
       _iconPicker.ShowOptions();
    });

    this.ShowOptions = function(){
        $("body").append('<div id="icon-picker"> <div class="options"><div class="exit fa fa-close"></div></div></div>');
        for(var i in icons){
            $("#icon-picker .options").append('<div class="option fa '+icons[i]+'" data-icon="'+icons[i].trim()+'" ></div>');
        }
        $("#icon-picker .exit").click(function(){
            _iconPicker.HideOptions();
        });
        $("#icon-picker .option").click(function(){
            _iconPicker.SelectIcon($(this).attr("data-icon"));
            _iconPicker.HideOptions();
        });
    }

    this.HideOptions = function(){
        $("#icon-picker .exit").unbind();
        $("#icon-picker").remove();
    }

    this.SelectIcon = function(icon){
        elm.find('input[name="icon"]').val(icon);
        elm.find('.iconDisplay').attr("class", "iconDisplay fa " + icon);
    }

    this.disable = function(){
        elm.find(".inputBoxLabel, .iconDisplay").hide();
    }

    this.enable = function(){
        elm.find(".inputBoxLabel, .iconDisplay").show();
    }
}

var DeadLinePicker = function(elm, estimatePicker, colorPicker){
    var self = this;
    elm.addClass("propertyPicker deadlinePicker");
    elm.html(`<div class="inputBoxLabel">Deadline</div>
              <input type="text" name="selectedTimeDisplay" />
              <input type="hidden" name="selectedTimeValue" />
              `);

    //private vars
    var picker = $("#TimePicker"); //added to dom below
    var selectedDate = picker.find(".selectedTime");
    var label = elm.find("[name=selectedTimeDisplay]");
    var value = elm.find("[name=selectedTimeValue]");
    var rendered = false;
    var date = moment();

    //click events
    elm.find(".inputBoxLabel, [name=selectedTimeDisplay]").click(function(){ self.show(); });
    
    this.reset = function(){
        label.val("none");
        value = null;
        date = null;
    }

    this.show = function(){
        self.render();
        picker.show();

        //calculate the width of the task
        var estimate = estimatePicker.GetValue();
        var color = colorPicker.GetValue();
        var percentage = (estimate / 24) * 100;
        picker.find(".task-preview").css({"width": percentage + "%", "margin-left": percentage * -1 + "%", "background-color": color.color});

        //set the default value
        date = moment();
        var timestamp = date.format('H:') + "0";
        var min = picker.find(`[data-timestamp='${timestamp}']`);
        min.trigger("mouseenter");
    }

    this.hide = function(){
        picker.hide();
    }

    this.render = function(){
        if(rendered)
            return;
        rendered = true;

        //render the timeline
        var hourTicks = "";
        var minsTicks = "";
        var tasksHtml = "";

        //build out the picker interface
        for(var h = 1; h < 25; h++){
            //add mins 
            for(var m = 0; m<12; m++){
                minsTicks += `<div class="min" data-timestamp="${h}:${m}" data-hour="${h}" data-min="${m*5}"></div>`
            }
            
            //add hours
            var hour = "";
            if(h < 12) hour = h + "am";
            else if(h == 12) hour = "12pm"
            else hour = (h - 12) + "pm";

            hourTicks += 
                `<div class="tick" data-hour="${h}">
                    <div class="marker"></div>
                    <div class="hourLabel">${hour}</div>
                </div>`
        }

        //add in tasks
        tasksHtml = `<div class="task-preview"></div>`;

        //add html to the page
        picker.find(".timeline .hours").html(hourTicks);
        picker.find(".timeline .mins").html(minsTicks);
        picker.find(".timeline .picker-tasks").html(tasksHtml);
    }

    this.disable = function(){
        elm.find(".inputBoxLabel, [name=selectedTimeDisplay]").hide();
    }

    this.enable = function(){
        elm.find(".inputBoxLabel, [name=selectedTimeDisplay]").show();
    }

    this.getValue = function(){

    }

    picker.delegate(".min", "mouseover", function(){
        var left = $(this).position().left;
        var hour = $(this).attr("data-hour");
        var min = $(this).attr("data-min");
        var zz = "am";

        if(hour > 12){
            hour = hour - 12;
            zz = "pm";
        }
        if(hour == 12) zz = "pm";
        if(min < 10) min = "0" + min;

        var dateLabel = `${hour}:${min}${zz}`;
        selectedDate.html(dateLabel);
        elm.find('[name=selectedTimeDisplay]').val(dateLabel);
        picker.find(".task-preview").css({"left": left});
    });

    picker.find(".exit").click(function(){
        self.hide();
        self.reset();
    });

    picker.find(".selectBtn, .timeline").click(function(){
        self.hide();
    });
}