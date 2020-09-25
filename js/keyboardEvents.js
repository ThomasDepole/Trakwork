var keyboard;
$(function(){
     keyboard = new window.keypress.Listener();

    keyboard.simple_combo("enter", function(){
       if($("body").find(".keypress-enter").length > 0){
           $("body").find(".keypress-enter").trigger("click");
           return;
       }

        TaskPicker.SelectType("generaltask");
    });

    $('body').keydown(function(event) {
        if (event.keyCode >= 65 && event.keyCode <= 90) { // if a letter pressed
            if($("body").find(".keypress-capture").length > 0){
                $("body").find(".keypress-capture").removeClass("keypress-capture").focus().val("");
            }
        }
    });
});


