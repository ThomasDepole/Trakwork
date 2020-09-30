
<?php 
    $siteurl = "http://trakwork.com";
    $version = 2.5;
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
		<!--
			<link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">
		-->
		<title>Trakwork</title>
		<!-- Bootstrap core CSS -->
		<link href="<?php echo $siteurl; ?>/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="<?php echo $siteurl; ?>/css/styles.css" rel="stylesheet">
		<!-- <link href="<?php echo $siteurl; ?>/timepicker/jquery.timepickr.css" rel="stylesheet"> --> 
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet">
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
	</head>
<body>

<div class="startday" style="display:none;">
		<div class="whiteOut"></div>
		<div class="wrapper">
			<span class="logo"> TrakWork </span>
			<div class="shawdow">
				<span class="tagline"> A quick and easy way to track your day </span>
			</div>
			<div class="buttonContainer">
				<div class="btn btn-success openStartModel"> Start My Day </div>
				<div class="btn btn-warning learnMore"> Learn More </div>
			</div>
			<div class="viewPast"> View Past Day's Tasks</div>
		</div>
</div>

<div class="container">
    <div class="MainClock">Loading</div>
    <div class="MiniNav">
        <a href="<?php echo $siteurl; ?>" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'plan') !== false) ?  "" : "active" ; ?>">Track</a>
        <span class="divider">|</span>
        <a href="<?php echo $siteurl; ?>/plan.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'plan') !== false) ?  "active" : "" ; ?>">Plan</a>
    </div>
    <div style="float:right"><i class="fa fa-cog settings"></i></div>
</div>