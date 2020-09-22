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
				<div style="float:right"> Task Type <select name="tasktype" id="tasktype" ></select>  </div>
				
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
        var _taskDetails = this;
        this.elm = $("#TaskModal");
        this.colorPicker = new ColorPicker( this.elm.find(".colorPicker") );
        this.estimate = new EstimatePicker( this.elm.find(".estimatePicker") );
        this.iconPicker = new IconPicker ( this.elm.find(".iconsPicker") );

        this.OpenTask = function(id){
            $("#TaskModal .starttime").html("Started: " + Tasks[id].StartTime());
            $("#TaskModal input[name=taskid]").val(id);
            if(Tasks[id].end > 0){
                $("#TaskModal .endtime").html("Ended: " + Tasks[id].EndTime());
                var TimeSpent = GetHoursDifference(Tasks[id].end, Tasks[id].start);
                $("#TaskModal .timespent").html(TimeSpent);
            }else{
                $("#TaskModal .endtime").html("now");
                var TimeSpent = GetHoursDifference(new Date(), Tasks[id].start);
                $("#TaskModal .timespent").html(TimeSpent);
            }

            // check if task is a resumed task, and change the id to the parent task for the rest of the operations of this modal
            var link_id = Tasks[id].link_id;
            if(link_id != null){
                id = link_id;
            }

            $("#TaskModal #taskid").val(id);
            $("#TaskModal #taskname").val(Tasks[id].name);
            $("#TaskModal #notes").val(Tasks[id].notes);
            $('#TaskModal #tasktype').html("");
            for(var i in TaskPickerTypes){
                var selected = null;
                if(TaskPickerTypes[i].type == Tasks[id].type) selected = "selected";

                $('#TaskModal #tasktype').append('<option value="'+ TaskPickerTypes[i].type +'" '+selected+' >'+ TaskPickerTypes[i].label +'</option>')
            }

            var estiamte = $.grep(Estimates, function(e){ return e.task_id == id; })[0];
            if(typeof estiamte != "undefined")
                TaskDetails.estimate.setEstimate(estiamte.hours);
            else
                TaskDetails.estimate.Reset();


            TaskDetails.Show(Tasks[id]);
        }

        this.Show = function(task){
            this.colorPicker.setOption(task.color.name);
            this.elm.find(".saveTask").addClass("keypress-enter")
            this.iconPicker.SelectIcon(task.icon);
            this.elm.modal();
        }

        this.Hide = function(){
            this.elm.find(".saveTask").removeClass("keypress-enter");
            this.estimate.setEstimate(0);
            $("#TaskModal").modal('hide');
        }
    }

    $(function(){
        $(".tasks .task").click(function(){  }) ;
    });
    $("body").delegate("#TaskModal .saveTask", "click", function(){
        var id = $("#TaskModal #taskid").val();
        Tasks[id].notes = $("#TaskModal #notes").val();
        Tasks[id].name = $("#TaskModal #taskname").val();
        Tasks[id].type = $('#TaskModal #tasktype').val();
        Tasks[id].type = $('#TaskModal #tasktype').val();
        Tasks[id].icon = $('#TaskModal input[name="icon"]').val();

        var color = $.grep(TaskStyles, function(e){ return e.name == $('#TaskModal input[name="color"]').val(); })[0];
        Tasks[id].color = color;

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
    });
</script>

