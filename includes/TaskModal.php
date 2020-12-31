<!-- The Actual Modal -->
<div class="modal fade" id="TaskModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<input type="text" name="TaskName" id="TaskName"  />
				
				<h4 class="modal-title" id="myModalLabel"></h4>
			</div>
			<div class="modal-body">
				<div class="taskTypeContainer" style="float:right"> Task Type <select name="tasktype" id="tasktype" ></select>  </div>
				
				Notes <br />
				<textarea name="notes" id="notes"></textarea>
				<div class="starttime"></div>
				<div class="endtime"></div>
				<div class="timespent"></div>

                <br />

                <div class="estimatePicker"></div>
                <div class="colorPicker"></div>
                <div class="iconsPicker"></div>

				<input type="hidden" name="taskid" id="taskid" />		
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-danger deleteTask" data-dismiss="modal" style="float:left">Delete</button>
                <button type="button" class="btn btn-default completeTask" data-dismiss="modal">Complete Task</button>
				<button type="button" class="btn btn-default reopenTask" data-dismiss="modal">Reopen Task</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary saveTask">Save</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script>
    var TaskDetails = new function(){
        var self = this;
        var _taskDetails = this;

        this.elm = $("#TaskModal");
        this.completeBtn = this.elm.find(".completeTask");
        this.reopenBtn = this.elm.find(".reopenTask");
        this.colorPicker = new ColorPicker( this.elm.find(".colorPicker") );
        this.estimate = new EstimatePicker( this.elm.find(".estimatePicker") );
        this.iconPicker = new IconPicker ( this.elm.find(".iconsPicker") );

        this.OpenTask = function(id){
            var task = Tasks[id];

            //hide task buttons
            self.completeBtn.hide();
            self.reopenBtn.hide();

            $("#TaskModal .starttime").html("Started: " + task.StartTime());
            $("#TaskModal input[name=taskid]").val(id);
            if(task.end > 0){
                $("#TaskModal .endtime").html("Ended: " + task.EndTime());
                var TimeSpent = GetHoursDifference(task.end, task.start);
                $("#TaskModal .timespent").html(TimeSpent);
            }else{
                $("#TaskModal .endtime").html("now");
                var TimeSpent = GetHoursDifference(new Date(), task.start);
                $("#TaskModal .timespent").html(TimeSpent);
            }

            // check if task is a resumed task, and change the id to the parent task for the rest of the operations of this modal
            var link_id = task.link_id;
            if(link_id != null){
                task = Tasks[link_id];
            }

            //update options
            $("#TaskModal #taskid").val(id);
            $("#TaskModal #taskname").val(task.name);
            $("#TaskModal #notes").val(task.notes);
            $('#TaskModal #tasktype').html("");
            self.colorPicker.setOption(task.GetColor().name);
            self.elm.find(".saveTask").addClass("keypress-enter")
            self.iconPicker.SelectIcon(task.icon);

            //select type
            for(var i in TaskPickerTypes){
                var selected = null;
                if(TaskPickerTypes[i].type == task.type) selected = "selected";

                $('#TaskModal #tasktype').append('<option value="'+ TaskPickerTypes[i].type +'" '+selected+' >'+ TaskPickerTypes[i].label +'</option>')
            }

            //grab the estimate
            if(typeof task.estimate === "number" && task.estimate > 0)
                self.estimate.setEstimate(task.estimate);
        
            //handle planned tasks
            if(task.plannedTaskId != null){
                var ptask = GetPlannedTaskById(task.plannedTaskId);
                if(ptask.completed)
                    self.reopenBtn.show();
                else
                    self.completeBtn.show();
            }  
            
            self.elm.modal();
        }

        this.Hide = function(){
            this.elm.find(".saveTask").removeClass("keypress-enter");
            this.estimate.setEstimate(0);
            $("#TaskModal").modal('hide');
        }

        this.DeleteTask = function(){
            DeleteLastTask();
        }

        this.SaveTask = function(){
            var id = $("#TaskModal #taskid").val();
            Tasks[id].notes = $("#TaskModal #notes").val();
            Tasks[id].name = $("#TaskModal #taskname").val();
            Tasks[id].type = $('#TaskModal #tasktype').val();
            Tasks[id].type = $('#TaskModal #tasktype').val();
            Tasks[id].icon = $('#TaskModal input[name="icon"]').val();
            Tasks[id].color = $('#TaskModal input[name="color"]').val();

            SetEstimate(id, TaskDetails.estimate.GetValue());

            for(var i in Tasks){
                if(Tasks[i].link_id == id){
                    Tasks[i].name = $("#TaskModal #taskname").val();
                }
            }
            
            SaveTasks();
            RenderTasks(".Tasks");
            RenderDayProgress();
            TaskDetails.Hide();
        }

        //keyboard events
        new TaskEditorKeyboardEvents(this.elm,this.SaveTask,this.elm.find('input[name=name]'), $("#TaskModal #notes"), this.estimate, null, this.colorPicker);
    }

    $("body").delegate("#TaskModal .saveTask", "click", function(){
        TaskDetails.SaveTask();
    });

    $("body").delegate("#TaskModal .deleteTask", "click", function(){
        TaskDetails.DeleteTask();
    });
    
</script>

