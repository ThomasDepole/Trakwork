var TaskEditorKeyboardEvents = function(container, saveFunction, nameField, notesField, estimatePicker, timePicker, colorPicker){
    var colorIndex = 0;
    $(container).keydown(function(e){
        //handle enter key
        if(e.key == "Enter"){
            if(typeof saveFunction === "function")
                saveFunction();
            return;
        }

        //handle free form typing
        if(e.keyCode >= 48 && e.keyCode <= 90){
            if((notesField == null || !notesField.is(":focus")) && nameField.hasClass("has-default-value"))
                container.find("[name=name]").val("").focus().removeClass("has-default-value");

            return;
        }

        //tab to exit notes or name field
        if(notesField != null){
            if(e.key == "Tab" && notesField.is(":focus")){
                notesField.blur();
                e.preventDefault();
                container.focus();
                return;
            }
        }else{
            if(e.key == "Tab" && nameField.is(":focus")){
                nameField.blur();
                e.preventDefault();
                container.focus();
                return;
            }
        }

        //ignore arrow keys if the notes field or name field is in focus
        if((notesField != null && notesField.is(":focus")) || nameField.is(":focus"))
            return;
        
        //timepicker actions
        if(timePicker != null){
            if(e.key == "ArrowLeft" && !e.shiftKey && !e.altKey)
                timePicker.increment("--");
            if(e.key == "ArrowLeft" && e.shiftKey && !e.altKey)
                timePicker.increment("-");

            if(e.key == "ArrowRight" && !e.shiftKey && !e.altKey)
                timePicker.increment("++");

            if(e.key == "ArrowRight" && e.shiftKey && !e.altKey)
                timePicker.increment("+");
        }

        //estimate actions
        if(estimatePicker != null){
            if(e.key == "ArrowDown" && !e.shiftKey && !e.altKey)
                estimatePicker.increment("-");

            if(e.key == "ArrowDown" && e.shiftKey && !e.altKey)
                estimatePicker.increment("--");

            if(e.key == "ArrowUp" && !e.shiftKey && !e.altKey)
                estimatePicker.increment("+");

            if(e.key == "ArrowUp" && e.shiftKey && !e.altKey)
                estimatePicker.increment("++");
        }
            
        //colors
        if(colorPicker != null){
            if(e.key == "ArrowLeft" && e.altKey)
            {
                if(colorIndex == 0)
                    colorIndex = container.find(".colorPicker .color-option").length;
                
                colorIndex--;
                var color = $(container.find(".colorPicker .color-option")[colorIndex]).attr("data-colorname");
                colorPicker.setOption(color);
                e.preventDefault();
                container.focus();
            }
            if(e.key == "ArrowRight" && e.altKey)
            {
                if(colorIndex == (container.find(".colorPicker .color-option").length - 1))
                colorIndex = -1;
                
                colorIndex++;
                var color = $(container.find(".colorPicker .color-option")[colorIndex]).attr("data-colorname");
                colorPicker.setOption(color);
                e.preventDefault();
                container.focus();
            }
        }
    });
}

$(function(){
    $("body").keydown(function(e){
        if(e.key == "z" && e.ctrlKey)
            Undo();
    });
});