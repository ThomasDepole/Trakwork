	
<!-- The Actual Modal -->
<div class="modal fade" id="CreatePlannedTaskModal" tabindex="-1" role="dialog" aria-labelledby="StartTask" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">Start/Change Task</h4>
			</div>
			<div class="modal-body">
				<div class="type-options">
                    <span class="typelabel"> Name </span>  <input type="text" name="name" value="" />
                    <br  />
                    <br  />

                    <div class="estimate"></div>
                    <div class="startTime"></div>
                    <div class="colorPicker"></div>
                    <div class="iconPicker"></div>

                    <input type="hidden" name="resumeTaskID">
                    <input type="hidden" name="tasktype">

				</div>
				
				<div class="resumetasks-chooser"></div>
				<div class="endDay-conform" style="display: none;">
					Are you sure you want to end?
					<br />
					<div class="btn btn-default endDay-confirm">Yes</div>
					<div class="btn btn-default endDay-no">No</div>
				</div>
					
			</div>
			<div class="modal-footer" >
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary go">Go</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script type="text/javascript" src="js/createPlannedTask.js?<?php echo $version; ?>" ></script>