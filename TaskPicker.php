	
<script>

	TaskPickerType.AddType("ticket", "Ticket Item", "fa-briefcase", true, true, "Ticket Number");
	TaskPickerType.AddType("generaltask", "Task", "fa-file-o", true, true, "Task Name");
	TaskPickerType.AddType("lunch", "Take Lunch", "fa-apple", false, false, "Lunch");
	TaskPickerType.AddType("nonbillable", "Non Billable", "fa-exclamation-triangle", false, false, "Non Billable");
	
	$("body").delegate(".type-option", "click", function(){
		var type = $(this).attr("data-tasktype");
		var can_nametask = TaskPickerTypes[type].can_nametask;
		
		if(can_nametask){
			$(".type-options .typelabel").html(TaskPickerTypes[type].nametasklabel);
			$(".type-options").attr("data-tasktype", type);
			$(".type-options").show();
			$("#StartTaskModal .modal-footer").show();
			$(".type-selector").hide();
			if(Tasks != null){
				$('input[name="name"]').val( "Task " + (Tasks.length + 1) );
			}
		}else{
			modalAction_startTask(TaskPickerTypes[type].type, TaskPickerTypes[type].nametasklabel );
		}
	
	});
	
	$("body").delegate("#StartTaskModal .go", "click", function(){
		var type = $(".type-options").attr("data-tasktype");
		type = TaskPickerTypes[type].type;
		var name = $('#StartTaskModal input[name=name]').val();
		modalAction_startTask(type, name);
		
		$(".task.new").show();
		$(".startday").hide();
	});
	
	$("body").delegate(".resumetask", "click", function(){
		$(".type-selector").hide();
		for(var i in Tasks){
			if(Tasks[i].link_id == null){
				var html = '<div class="resume-option" data-task="'+i+'">' + Tasks[i].name + '</div>';
				$(".resumetasks-chooser").append(html);
			}
		}
	});
	
	
	
	$("body").delegate(".resume-option", "click", function(){
		var task = $(this).attr("data-task");
		
		type = Tasks[task].type;
		name = Tasks[task].name;
		var newtask = modalAction_startTask(type, name);
		Tasks[newtask].link_id = task;
		SaveTasks();
		
	});
	
	$("body").delegate(".endDay-option", "click", function(){
		$(".type-selector").hide();
		$(".endDay-conform").show();
	});
	
	$("body").delegate(".endDay-confirm", "click", function(){
		$(".endDay-conform").hide();
		modalAction_startTask("endday", "End");
	});
	
	$("body").delegate(".endDay-no", "click", function(){
		$(".endDay-conform").hide();
		$(".type-selector").show();
		$(".endDay-conform").hide();
	});
	
	function resetTaskPicker(){
		$("#StartTaskModal .type-selector").show();
		$("#StartTaskModal .modal-footer").hide();
		$("#StartTaskModal .type-options").hide();
		$("#StartTaskModal .resume-option").hide();
	}
	
	function modalAction_startTask(type, name){
		
		$(".task.new .name").html("Change Task");
		
		if($(".tasks .task").length > 0){
			EndTask( $(".tasks .task:last-child").attr("data-task_id"));
		}
		
		var id = StartTask(type, name);
		
		if ($('input[name="goal"]').val() != "")
			Estimate.Add(id, $('input[name="goal"]').val());
		
		RenderTasks(".tasks");
		RenderDayProgress();
		SaveTasks();
		SaveEstimates();
		$("#StartTaskModal").modal("hide");
		
		return id;
	}
</script>

<!-- The Actual Modal -->
<div class="modal fade" id="StartTaskModal" tabindex="-1" role="dialog" aria-labelledby="StartTask" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">Start/Change Task</h4>
			</div>
			<div class="modal-body">
				
				<div class="type-selector" >
					
					<div class="resumetask  task"><div class="icon"><i class="fa fa-refresh" ></i></div><div class="name">Resume Task</div></div>
					
					<div class="thetasks"></div>
					
					<div class="endDay-option  task"><div class="icon"><i class="fa fa-beer" ></i></div><div class="name">End Day</div></div>
					
					<script>
						$(document).ready(function(){
							for(var i in TaskPickerTypes){
								var html = '<div class="type-option task" data-tasktype="'+i+'"><div class="icon"><i class="fa '+TaskPickerTypes[i].icon+'" ></i></div><div class="name">'+TaskPickerTypes[i].label+'</div></div>';
								$("#StartTaskModal .thetasks").append(html);
							}
						});
					</script>
					
				</div>
				
				<div class="type-options" data-tasktype="" style="display: none;">
					<div class="name">
						<span class="typelabel"> Name </span>  <input type="text" name="name" value="" />
						<br  />
						<br  />
						<span> Goal </span>  <input type="text" name="goal" value="" /> "In hours"
					</div>
				</div>
				
				<div class="resumetasks-chooser"></div>
				<div class="endDay-conform" style="display: none;">
					Are you sure you want to end?
					<br />
					<div class="btn btn-default endDay-confirm">Yes</div>
					<div class="btn btn-default endDay-no">No</div>
				</div>
					
			</div>
			<div class="modal-footer" style="display: none;">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary go">Go</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

