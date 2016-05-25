/**
 * Created by Thomas Depole on 2/10/15.
 */

var SoupAnimations = function(canvas, animations){
    if(typeof canvas == "undefined")
        throw "[SoupAnimation] Must declare Canvas";

    this.activeScene = 1;
    this.canvas = canvas;
    this.activeAnimation = null;
    if(typeof animations == "object")
        this.animations =   animations;
    else
        this.animations = { };

    this.ChangeScene = function(scene){
        this.Scene(this.activeScene).fadeOut().removeClass("active");
        this.Scene(scene).fadeIn().addClass("active");

        //stop the previous animation
        if(this.activeAnimation != null)
            this.activeAnimation.stop();

        if(typeof this.animations['scene' + scene] == "function"){
            this.activeAnimation = new this.animations['scene' + scene]();
            this.activeAnimation.start();
        }else
            this.activeAnimation = null;


        this.activeScene = scene;
    }

    this.NextScene = function(){
        this.ChangeScene((this.activeScene + 1));
    }

    this.PreviousScene = function(){
        if(this.activeScene == 1)
            return
        this.ChangeScene((this.activeScene - 1));
    }

    this.Scene = function(num){
        return this.canvas.find('[data-scene="'+num+'"]');
    }
};