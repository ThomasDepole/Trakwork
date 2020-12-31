<?php include 'includes/header.php'; ?>
 
    <!-- Planner, grid view -->
    <div id="Planner"></div>
    <div id="DayTemplate" style="display:none;">
        <div class="day">
            <div class="dayLabel"></div>
            <div class="ProgressBar"></div>
            <div class="msg"></div>
            <div class="plannedTasks"></div>
        </div>
    </div>

    <!-- List view -->
    <div id="TaskList"></div>
    <div id="TaskListItemTemplate" style="display:none;">
        <div class="TaskItem">
            <div class="label">{label}</div>
        </div>
    </div>

    <!-- work in progress
    <div id="ShowArchived">Show Completed Tasks</div>
    -->
    <div id="ColorSummary"></div>

    <script src="<?php echo $siteurl; ?>/js/plan.js?<?php echo $version; ?>"></script>
    
<?php 
    include 'includes/footer.php'; 
    include 'includes/CreatePlannedTaskModal.php';
    include 'includes/TaskModal.php'; 
    include 'includes/SettingsModal.php'; 
?>