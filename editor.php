<?php

	namespace com\csga5000\WebGameLib;
	require_once('php/TemplateLoader.php');

	session_start();

	if (!isset($_SESSION['user_id']))
		header('Location: ftp_login(ftp_stream, username, password).php');
	if (!isset($_SESSION['world_id']))
		header('Location: index.php');

	echo TemplateLoader::getTemplate('head',[
		'js' => [
			'Viewport',
			'add_tile',
			'Tile',
			'Game/InputManager',
			'Game/Vector',
			'Game/Objs/GameObj',
			'Game/Objs/TileObj',
			'Game/Objs/DoorObj',
			'Game/Objs/PortalObj',
			'Game/Objs/DynamicObj',
			'Game/Objs/PlayerObj',
			'Game/Game',
			'index'
		],
		'css' => ['game']
	]);

?>
<script>
function select() {
	$("#table1 td").css("background-color", "");
	$(this).css("background-color", "#8888FF");
}
$(document).ready(function(){
	$("#table1 td").click(select);
})
</script>

<?php
	echo TemplateLoader::getTemplate('add_tile_modal');
	echo TemplateLoader::getTemplate('logout');
?>

<!-- TODO: Move these modals to their own template files -->
<div class="modal fade" id="saveModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				Save Text
			</div>
			<div class="modal-body">
				<textarea style="width:100%;height:200px;"></textarea>
			</div>
			<div class="modal-footer">
				<button class="btn-success" data-dismiss="modal" data-target="#saveModal">Done</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="loadModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				Paste Text
			</div>
			<div class="modal-body">
				<textarea style="width:100%;height:200px;"></textarea>
			</div>
			<div class="modal-footer">
				<button id="loadSave" class="btn-success" data-dismiss="modal" data-target="#loadModal">Done</button>
			</div>
		</div>
	</div>
</div>

<h1>World id#<?php echo $_SESSION['world_id'];?></h1>

<table width="100%" id="getContent"><tbody>
	<tr>
		<!-- LEFT PANEL -->
		<td id="tile_select_panel">
			<h3 style="margin:0px;">Tile Select</h3>
			<hr>

			<div id="tile_list">
			</div>
			<hr>

			<label for="rotation">Rotation:</label>
			<input name="rotation" class="short" type="text" placeholder="0" />

			<div style="display:inline-block;">
				<img src="imgs/counter-clockwise.png" style="width:auto; height: 32px; max-width:50%;" id="rotate-counter" />
				<img src="imgs/clockwise.png" style="width:auto; height: 32px; max-width:50%;" id="rotate" />
			</div>

			<hr>

			<button class="btn-success" style="margin-top:5px;" type="bottom" data-toggle="modal" data-target="#createObjectModal">Create a New Tile</button>
		</td>
		<!-- CENTER PANEL -->
		<td>
			<div class='pad' style="width:100%">
				<div id="mapBuilderContent" style="width:100%">
					<div style="display: inline-block;">
						<div id="mapTiles" style="display: inline-block;">

						</div>
						<div style="clear:both; width: 10px"></div>

						<table style="width:100%; margin-top:5px;"><tbody>
							<tr>
								<td>
									<div class="input-group">
										<label>Width:</label>
										<br>

										<input type="number" id="mapW" value="25"/>
									</div>
									<div class="input-group">
										<label>Height:</label>
										<br>
										<input type="number" id="mapH" value="10" />
									</div>

									<button id="resize" class="btn-warning" style="display:inline;">Resize</button>

									<br>

									<div style="width:auto; margin-top:5px;">
										<div class="input-group">
											<label>Viewport Width:</label>
											<br>
											<input id="resizeViewport" type="number" placeholder="100" />
										</div>
										<div class="input-group" style="margin-top:5px">
											<label>Custom Tile Size:</label>
											<br>
											<input id="resizeTiles" type="number" placeholder="auto" />
										</div>
									</div>
								</td>
								<td style="text-align:right;">
									<button class="btn-danger" onclick="" tabindex="1">Clear</button>
									<button class="btn-success" id="saveMap" style="margin-top:5px;" type="bottom" data-toggle="modal" data-target="#saveModal">Save</button>
									<button class="btn-success" id="loadMap" style="margin-top:5px;" type="bottom" data-toggle="modal" data-target="#loadModal">Load</button>
									<button class="btn-success" onclick="submitLevel()" tabindex="2">Submit</button>
								</td>
							</tr>
						</tbody></table>
					</div>
				</div>
			</div>
		</td>
	</tr>
</tbody></table>

<?php
	echo TemplateLoader::getTemplate('footer');
?>