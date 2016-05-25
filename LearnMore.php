<div id="LearnMore">
    <div class="container">
        <div class="row section" data-section="1">
            <div class="col-lg-12">
                <div id="Canvas">
                    <div  data-scene="1">
                        <div class="infoBox">
                            Trakwork is a very lightweight day tracker that helps you track all the tasks. It's designed to be effortless, and forces you to not leave gaps in your day, so when you reached then end of your day, all your tasks adds up.
                            <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                        </div>
                    </div>

                    <div  data-scene="2">
                        <div class="infoBox">
                            <div class="tasksArea"></div>
                            <div class="progressBar"></div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is your progress bar, it shows you how much of your day you have completed. By default it's setup for an 8 hour work day. You can change your day length in your settings, but we will go over that later.

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="3">
                        <div class="infoBox">
                            <div class="tasksArea"></div>
                            <div class="progressBar"></div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is when you started your day, it's determined when you start your first task.

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="4">
                        <div class="infoBox">
                            <div class="tasksArea"></div>
                            <div class="progressBar"></div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is when your day ends, it's calculated 8 hours after when you started your day, but you can change that (we will go over that later). But your end time can change, based off of your tasks.

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="5">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar"></div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is a task, all your tasks will stack up here.

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="js/SoupAnimations.js" ></script>
<script>
    var animations = {
        scene5 : function(){
            this.start = function(){
                console.log("started");
            }
            this.stop = function(){
                console.log("ended");
            }
        }
    };
    var learnMore = new SoupAnimations($("#LearnMore #Canvas"), animations);
    learnMore.ChangeScene(1);
</script>


<style>
    #LearnMore #Canvas{
        position: relative;
        height: 100%;
    }

    #LearnMore .tasksArea{
        height: 187px;
        padding-top: 32px;
    }

    #LearnMore .startTime, .endTime {
        display: inline-block;
    }

    #LearnMore .endTime {
        float: right;
    }

    #LearnMore #Canvas .btn.continue{
        display: block;
        width: 80px;
        margin: 10px auto auto auto;
    }

    #LearnMore .pointer {
        font-size: 12px;
        color: #000;
        background-color: #FFF;
        width: 350px;
        position: relative;
        padding: 10px;
        border: 1px solid #666;
        right: 0px;
        -webkit-box-shadow: #666 0px 0px 10px;
        -moz-box-shadow: #666 0px 0px 10px;
        box-shadow:#666 0px 0px 10px;
        -moz-border-radius:3px;
        -webkit-border-radius:3px;
        border-radius:3px;
        z-index: 100;
    }
    #LearnMore .pointer .arrow  {
        height:0;
        width:0;
        position:absolute;
        top:-30px;
        left:31px;
        border-top-width: 15px;
        border-right-width: 15px;
        border-bottom-width: 15px;
        border-left-width: 15px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: #FFFFFF;
        border-left-color: transparent;
        margin: 0px;
        margin-left: 1px;
        padding: 0px;
    }
    #LearnMore .pointer .arrow-border  {
        height:0;
        width:0;
        position:absolute;
        top:-33px;
        left: 31px;
        border-top-width: 16px;
        border-right-width: 16px;
        border-bottom-width: 16px;
        border-left-width: 16px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: #333;
        border-left-color: transparent;
        margin: 0px;
        padding: 0px;
    }

    #LearnMore #Canvas [data-scene]{
        display: none;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    #LearnMore #Canvas [data-scene="1"] .infoBox{
        width: 420px;
        margin: auto;
        width: 420px;
        position: absolute;
        left: 50%;
        margin-left: -220px;
        top: 50%;
        height: 160px;
    }


    #LearnMore #Canvas [data-scene="2"] .pointer{
        top: 30px;
    }

    #LearnMore #Canvas [data-scene="3"] .pointer{
        top: 18px;
    }
    #LearnMore #Canvas [data-scene="3"] .pointer .arrow,
    #LearnMore #Canvas [data-scene="3"] .pointer .arrow-border{
        left: 4px;
    }

    #LearnMore #Canvas [data-scene="4"] .pointer{
        top: 18px;
        left: 790px
    }
    #LearnMore #Canvas [data-scene="4"] .pointer .arrow,
    #LearnMore #Canvas [data-scene="4"] .pointer .arrow-border{
        left: 305px;
    }

    #LearnMore #Canvas [data-scene="5"] .pointer{
        bottom: 100px;
    }
    
</style>