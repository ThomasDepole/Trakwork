	
<!-- The Actual Modal -->
<div class="modal fade" id="StartTaskModal" tabindex="-1" role="dialog" aria-labelledby="StartTask" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">Start/Change Task</h4>
			</div>
			<div class="modal-body">
			
				<div class="type-options" style="display: none;">
                    <span class="typelabel"> Name </span>  <input type="text" name="name" value="" />
                    <br />
                    <br />

                    <div class="estimate"></div>
                    <div class="startTime"></div>
                    <div class="colorPicker"></div>
                    <div class="iconPicker"></div>

                    <input type="hidden" name="resumeTaskID"/>
					<input type="hidden" name="plannedTaskID"/>
                    <input type="hidden" name="tasktype"/>

				</div>
				
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
		<div id="QuickTaskPicker">
			<div id="QuickOptions">
				<h1>Quick Options</h1>
				<div class="task-list">
					<div class="task quickTaskOption" data-type="generalTask">
						<div class="icon"><i class="fa fa-file-o"></i></div>
						<div class="name">Task</div>
					</div>
					<div class="task quickTaskOption" data-type="lunch">
						<div class="icon"><i class="fa fa-apple"></i></div>
						<div class="name">Lunch</div>
					</div>
					<div class="task quickTaskOption" data-type="nonBillable">
						<div class="icon"><i class="fa fa-file-o"></i></div>
						<div class="name">Non Billable</div>
					</div>
					<div class="task quickTaskOption" data-type="endDay">
						<div class="icon"><i class="fa fa-beer"></i></div>
						<div class="name">End Day</div>
					</div>
				</div>
			</div>

			<div id="ResumeTaskOptions">
				<h1>Resume a Task</h1>
				<div class="task-list"></div>
			</div>
			
			<div id="PlannedTaskPicker">
				<h1>Planned Tasks</h1>
				<div class="task-list"></div>
			</div>
		</div>

	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script type="text/javascript" src="js/taskpicker.js?<?php echo $version; ?>" ></script>

