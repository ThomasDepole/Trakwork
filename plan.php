<?php include 'includes/header.php'; ?>
    <div class="container">
        <div id="Planner">
            
            
        </div>
    </div>

    <div id="DayTemplate" style="display:none;">
        <div class="day">
            <div class="dayLabel"></div>
            <div class="plannedTasks"></div>
            <div class="ProgressBar"></div>
        </div>
    </div>

    <script src="<?php echo $siteurl; ?>/js/plan.js?<?php echo $version; ?>"></script>
    
<?php 
    include 'includes/footer.php'; 
    include 'includes/CreatePlannedTaskModal.php';
    include 'includes/TaskModal.php'; 
?>