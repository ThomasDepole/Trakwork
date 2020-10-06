<?php include 'includes/header.php'; ?>
	
	<?php include 'includes/LearnMore.php'; ?>

	<div id="App" class="container">
		<div class="tasks"></div>
		<div class="task new" data-task_id="x">
			<div class="icon"><i class="fa fa-random"></i></div>
			<div class="name">Start Your Day</div>
		</div>
		
		<div class="DayProgress ProgressBar"></div>
		<div class="progress-times"></div>
		<div class="Estimates"></div>
		<div class="dayReport"></div>
	</div>

	<script>
		$(".task.new").click(function(){
			TaskPicker.Reset();
			TaskPicker.Show();
		});

		$(document).ready(function(){
			setTimeout(function(){
				$(".whiteOut").fadeOut( 1000 );
			}, 1200);

			$(".startday").backstretch("<?php echo $siteurl; ?>/images/home-1.jpg");

			if(Tasks.length > 0){
				var today = new Date();
				today = today.getYear() +  today.getMonth() + today.getDate();

				var firstTaskInMemory = new Date(Tasks[0].start);
				var taskStart = firstTaskInMemory.getYear() +  firstTaskInMemory.getMonth() + firstTaskInMemory.getDate();

				if(today > taskStart){
					$(".startday").show();
					$(".task.new").hide();
				}
			}else{
				$(".startday").show();
				$(".task.new").hide();
				$(".viewPast").hide();
			}
			
			$(".viewPast").click(function(){
				$(".startday").hide();
			});
			
			$(".openStartModel").click(function(){
				Tasks = [];
				TaskPicker.Reset();
				TaskPicker.Show();
				ClearDay();
			});

			$(".btn.learnMore").click(function(){
				$("#LearnMore").show();
				$(".startDay").slideUp();
				$("#App").hide();
			});

			$.get("<?php echo $siteurl; ?>/includes/icons.php", function(res){
				icons = res.split(",");
			});
		});
	</script>
	
	<?php 
	include 'includes/TaskPicker.php'; 
	require 'includes/TaskModal.php'; 
	include 'includes/SettingsModal.php'; 
include 'includes/footer.php'; ?>