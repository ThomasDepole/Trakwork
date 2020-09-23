<?php include 'includes/header.php'; ?>
    <div class="container">
        <div id="Planner">
            <div class="day">
                <div class="dayLabel">Today</div>
                <div class="plannedTasks">
                    
                    <div class="task newPlanned" data-task_id="0"><div class="icon"><i class="fa fa-plus"></i></div><div class="name">Add Task</div></div>
                </div>
                <div class="ProgressBar">
                    <div data-task_id="0" class="type-generaltask endedtask" style="width: 3.5416666666666665%; "></div>
                    <div class="TimeRemaining"> 59m </div>
                </div>
            </div>
        </div>
        <script>
            $(function(){
                 for(var i =0; i<2; i++){
                    $(".plannedTasks").prepend('<div class="task type-generaltask" data-task_id="0" style="background-color: #2CB32C ; color: #FFF ;"><div class="icon"><i class="fa fa-file-o"></i></div><div class="name">Task 1</div></div>');
                 }
            });
        </script>
    </div>
<?php include '../includes/footer.php'; ?>