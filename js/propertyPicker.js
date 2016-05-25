var ColorPicker = function(elm){
    var _colorPicker = this;
    elm.addClass("propertyPicker colorPicker unselectable")

    //add the picker html
    elm.html('<div class="inputBoxLabel">Color</div><input type="text" name="colorPreview"><input type="hidden" name="color"><div class="options"></div>');

    //need a better way to wait for the options to be loaded before referencing it
    $(function(){
        // render colors
        for(var i in TaskStyles){
            var option = $('<div class="color-option" data-colorName="'+TaskStyles[i].name+'" style="background-color: '+TaskStyles[i].color+' ;"></div>').appendTo(elm.find(".options"));
            $(option).click(function(){
                var colorName = $(this).attr("data-colorName");
                _colorPicker.setOption(colorName);
            });
        }
    });

    this.setOption  = function(name){
        var style = $.grep(TaskStyles, function(e){ return e.name == name; })[0];
        elm.find('input[name="color"]').val(style.name)
        elm.find('input[name="colorPreview"]').css("background-color", style.color);
    }

    this.showOptions = function(){
        elm.find(".options").show();
        HideOnMouseLeave(elm, _colorPicker.hideOptions, 600);
    }

    this.hideOptions = function(){
        elm.find(".options").fadeOut();
    }

    //bind the click handler
    elm.click(function(){
        _colorPicker.showOptions();
    });
}

var StartTimePicker = function(elm){
    var _startTimePicker = this;
    elm.addClass("propertyPicker startTimePicker unselectable");
    elm.html('<div class="inputBoxLabel startTimeLabel">Start Time</div><input type="text" name="startTimeDisplay"><input type="hidden" name="startTimeValue"><div class="options"><button class="btn decrease2"><<</button><button class="btn decrease"><</button><button class="btn increase">></button><button class="btn increase2">>></button></div>');

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
        var now = new Date();
        elm.find('.btn').removeClass("disabled");

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


        var timeValues = getTimeValues(date , true);
        elm.find('input[name="startTimeDisplay"]').val(timeValues[0] + ":" + timeValues[1] + " " + timeValues[3]);
        elm.find('input[name="startTimeValue"]').val(date);
    }
    this.setStartTime(new Date());

    var currentDate = function() {  return  elm.find('input[name="startTimeValue"]').val();  }

    elm.find(".increase").click(function(){
        var newTime =  new Date( currentDate());
        _startTimePicker.setStartTime(newTime.addMinutes(1));
    });
    elm.find(".increase2").click(function(){
        var newTime =  new Date( currentDate());
        _startTimePicker.setStartTime(newTime.addMinutes(30));
    });

    elm.find(".decrease").click(function(){
        var newTime =  new Date( currentDate());
        _startTimePicker.setStartTime(newTime.subtrackMinutes(1));
    });

    elm.find(".decrease2").click(function(){
        var newTime =  new Date( currentDate());
        _startTimePicker.setStartTime(newTime.subtrackMinutes(30));
    });
}

var EstimatePicker = function(elm){
    var _estimatePicker = this;
    elm.addClass("propertyPicker estimatePicker unselectable");
    elm.html('<div class="inputBoxLabel estimatelabel">Estimate</div><input type="text" name="estimateDisplay"/><div class="options"><button class="btn decrease2"><<</button><button class="btn decrease"><</button><button class="btn increase">></button><button class="btn increase2">>></button></div>');
    this.estimate = 0;

    this.setEstimate = function(value){
        if(value < 0)
            value = 0;

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

    this.Reset = function(){
        this.setEstimate(0);
    }

    this.GetValue = function(){
        return this.estimate;
    }

    //bind the click handler
    elm.click(function(){
        _estimatePicker.showOptions();
    });

    elm.find(".increase").click(function(){
        _estimatePicker.setEstimate(_estimatePicker.estimate + .25);
    });
    elm.find(".increase2").click(function(){
        _estimatePicker.setEstimate((_estimatePicker.estimate + .50));
    });

    elm.find(".decrease").click(function(){
        _estimatePicker.setEstimate((_estimatePicker.estimate - .25));
    });

    elm.find(".decrease2").click(function(){
        _estimatePicker.setEstimate((_estimatePicker.estimate -.50));
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

}
