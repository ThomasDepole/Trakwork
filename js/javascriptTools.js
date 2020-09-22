//Requires Jquery
var HideOnMouseLeave = function(elm, hideFunction, timeout){
    if(typeof timeout == "undefined")
        timeout = 1000;

    var timeoutID = null;
    elm.hover(function(){
        if(timeoutID != null)
            clearTimeout(timeoutID);
    }, function(){
        timeoutID = setTimeout(function(){
            if(typeof hideFunction == "function")
                return hideFunction();

            return elm.hide();
        },timeout);
    });
}