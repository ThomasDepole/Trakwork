<!-- The Actual Modal -->
<div class="modal fade" id="SettingsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel"> Settings </h4>
			</div>
			<div class="modal-body">
				
				<center>
					<div class="btn btn-danger " data-dismiss="modal" onclick="ClearDay();">Clear Day</div>
					<div class="btn btn-info" data-dismiss="modal" onclick="RenderDayReport();"> Show Report</div>
				</center>
				
				<br />
				<hr />
				
				<span class="SectionTitle">Day Progress Bar</span>
				
				<div class="inputBoxLabel">Day Length:</div> <input type="text" name="daylength" value="" /> In Hours

                <div style="margin-top: 10px;">
                    <b>Style:</b>
                    <input id="BarStyleGray" type="radio" name="progressBarStyle" value="gray"> <label for="BarStyleGray"> Gray </label>
                    <input id="BarStyleDetailed" type="radio" name="progressBarStyle" value="detailed"> <label for="BarStyleDetailed">Detailed</label>
                </div>


                <!--
                <div class="section">
                    <span class="SectionTitle">Task Styles</span>
                    <div class="tasks">
                    </div>
                </div>
				-->

			</div>
			<div class="modal-footer">
				<button type="buttoon" class="btn btn=default btn-info saveSettings">Save</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script>
    $(function(){
        $(".settings").click(function(){
            $("#SettingsModal").modal();
        });

        $("#SettingsModal input[name=daylength]").val(GetSetting("DayLength") / 60);

        $("#SettingsModal .saveSettings").click(function(){
            SetSetting("DayLength",  $("#SettingsModal input[name=daylength]").val() * 60);
            SetSetting("ProgressBarStyle", $('#SettingsModal input:radio[name=progressBarStyle]:checked').val() );
            location.reload();
        });

        var progresBar = GetSetting("ProgressBarStyle");
        if (progresBar == null)
            progresBar = "gray";

        $('#SettingsModal input:radio[name=progressBarStyle]').val([progresBar]);

    });
</script>