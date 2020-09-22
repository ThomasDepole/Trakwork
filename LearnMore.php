<div id="LearnMore">
    <div class="container">
        <div class="row section" data-section="1">
            <div class="col-lg-12">
                <div id="Canvas">
                    <div  data-scene="1">
                        <div class="infoBox">
                            Trakwork is a lightweight time tracker that helps you track all your work throughout the day. 
                            It's designed to be effortless, and forces you to not leave gaps in your day, so when you reached then end of your day 
                            all your work adds up. This tool is designed for people that need to track billable hours, great for contractors! 
                            <div class="btn btn-success continue" onclick="learnMore.NextScene()"> Show me how it works! </div>
                            <div class="btn btn-warning exitTutorial">Exit Tutorial </div>
                        </div>
                    </div>

                    <div  data-scene="2">
                        <div class="infoBox">
                            <div class="tasksArea"></div>
                            <div class="progressBar"><div data-task_id="0" class="type-generaltask currenttask" style="width: 12.916666666666668%; "></div></div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is your progress bar, it shows you how much of your day you have completed. 
                                By default it's setup for an 8 hour work day. You can change your day length in your settings, 
                                but we will go over that later.

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="3">
                        <div class="infoBox">
                            <div class="tasksArea"></div>
                            <div class="progressBar"><div data-task_id="0" class="type-generaltask currenttask" style="width: 12.916666666666668%; "></div></div>
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
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is a task, all your tasks will stack up here.

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="6">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                The progress bar shows you tasks as time goes on.
                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="7">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is how you change the task you're working on. This is very important! 
                                You can't stop tracking your day until you're finished with your day. You must transtion to another task. 
                                If you're taking a break or doing something that doesn't count towards your day for example a lunch break you can 
                                change to a non-billable task. We will explain how that works later.
                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="8">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                Here you can pick the next task to switch too. Let's go through them.
                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="9">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is a task that counts towards your day. Tasks don't affect the end time of your day. (I'll explain why that matters next)
                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="10">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                This is a non-billable task. Non-billable tasks will add to the end time of your day. 
                                You would use this if you're doing something that doesn't count towards your billable hours.
                                For example if you started your day at 9am and the end of your day is at 5pm, if you start a 
                                non-billable task for 30min the end of your day will be 5:30pm. So only use this if what you're doing
                                doesn't count torwards your day like taking a break or taking lunch (you can use a regular task if your lunch is billable)

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="11">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                You can resume tasks you already started during the day. I'll exlain why this feature is useful next!

                                <div class="btn btn-warning continue" onclick="learnMore.NextScene()"> Continue </div>
                            </div>
                        </div>
                    </div>

                    <div  data-scene="12">
                        <div class="infoBox">
                            <div class="tasksArea">
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 1</div>
                                </div>
                                <div class="task" style="background-color: #39B3D7 ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 2</div>
                                </div>
                                <div class="task" style="background-color: #2CB32C ; color: #FFF ;">
                                    <div class="icon"><i class="fa fa-inbox"></i></div>
                                    <div class="name">Task 3</div>
                                </div>
                                <div class="task new" data-task_id="x">
                                    <div class="icon"><i class="fa fa-random"></i></div>
                                    <div class="name">Change Task</div>
                                </div>
                            </div>
                            <div class="progressBar">
                                <div data-task_id="0" class="type-generaltask endedtask" style="width: 8.541666666666666%; background-color:#2CB32C"></div>
                                <div data-task_id="1" class="type-generaltask endedtask" style="width: 4.583333333333333%; background-color:#39B3D7"></div>
                                <div data-task_id="2" class="type-generaltask currenttask" style="width: 1.875%; background-color:#2CB32C"></div>
                            </div>
                            <div class="startTime">9:00am</div>
                            <div class="endTime">5:00pm</div>

                            <div class="pointer">
                                <div class="arrow-border"></div><div class="arrow"></div>
                                You can end your day at any time. After you end your day 
                                a report will appear that shows you all the time you spent on your tasks. Here's the best part,
                                you can also resume tasks you already started during the day, if you resume a task the report will add 
                                all the time you worked on that task! Great for those crazy days when you're jumping around tasks.

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
        scene1 : function(){
            this.start = function(){
                $(".task.new").hide();
            }
            this.stop = function(){
                console.log("ended");
            }
        },
        scene7 : function(){
            this.start = function(){
                $(".task.new").show();
            }
            this.stop = function(){
                console.log("ended");
            }
        },
        scene8 : function(){
            this.start = function(){
                $(".task.new").click();
                $(".endDay-option").show();
                $(".resumetask").show();
            }
            this.stop = function(){
                console.log("ended");
            }
        }
    };

    var learnMore = new SoupAnimations($("#LearnMore #Canvas"), animations);
    learnMore.ChangeScene(1);

    $(".btn.exitTutorial").click(function(){
        $("#LearnMore").hide();
        $(".startDay").slideDown();
        $("#App").show();
        ClearDay();
    });
</script>