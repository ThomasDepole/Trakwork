<?php 
$siteurl = "http://localhost:1010/worklogtrackergithub";
$version = 2.3;
?>

<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Questrial' rel='stylesheet' type='text/css'>
        <meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">
		<title>My Day - Time Planner</title>
		<!-- Bootstrap core CSS -->
		<link href="<?php echo $siteurl; ?>/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="<?php echo $siteurl; ?>/styles.css" rel="stylesheet">
		<!-- <link href="<?php echo $siteurl; ?>/timepicker/jquery.timepickr.css" rel="stylesheet"> --> 
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
		<!-- Custom styles for this template -->
		<!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->
		
		<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script src="<?php echo $siteurl; ?>/js/javascriptTools.js?<?php echo $version; ?>"></script>
		<script src="<?php echo $siteurl; ?>/bootstrap/js/bootstrap.min.js"></script>
        <script src="<?php echo $siteurl; ?>/js/moment.js"></script>
		<script src="<?php echo $siteurl; ?>/js/backstretch.js"></script>
		<script src="<?php echo $siteurl; ?>/js/cookie.js"></script>
		<script src="<?php echo $siteurl; ?>/js/myday.js?<?php echo $version; ?>"></script>
        <script src="<?php echo $siteurl; ?>/js/keypress-2.1.0.min.js"></script>
        <script src="<?php echo $siteurl; ?>/js/keyboardEvents.js?<?php echo $version; ?>"></script>
        <script src="<?php echo $siteurl; ?>/js/propertyPicker.js?<?php echo $version; ?>"></script>
		<!-- <script src="<?php echo $siteurl; ?>/timepicker/jquery.timepickr.js"></script>
		<script src="<?php echo $siteurl; ?>/timepicker/ui.timepickr.js"></script> -->
		
	</head>
	<body>

		<div class="startday" style="display:none;">
            <div class="whiteOut"></div>
            <div class="wrapper">
                <span class="logo"> TrakWork </span>
                <div class="shawdow">
                    <span class="tagline"> A quick and easy way to track your day </span>
                </div>
                <div class="btn btn-success openStartModel"> Start My Day </div>
                <div class="viewPast"> View Past Day's Tasks</div>
            </div>
		</div>
		<script>
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
                        Tasks = [];
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
                    TaskPicker.Reset();
					TaskPicker.Show();
					ClearDay();
				});
			});
		</script>
		
		<div class="container">
			<div class="MainClock">Loading</div>
			<div style="float:right"><i class="fa fa-cog settings"></i></div>
		</div>
		
		
		<div class="container app">
			<div class="tasks"></div>
			<div class="task new" data-task_id="x">
				<div class="icon"><i class="fa fa-plus"></i></div>
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

		</script>
		
	</body>
	
	<!-- modal stuff -->
	<?php include 'TaskPicker.php'; ?>
    <!-- a -->
	<?php require 'TaskModal.php'; ?>
    <!-- b -->
	<?php include 'SettingsModal.php'; ?>
</html>