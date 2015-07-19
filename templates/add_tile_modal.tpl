<!-- Create Object Modal -->
<div class="modal fade" id="createObjectModal">
	<div class="modal-content container">
		<div class="modal-header">
			<h1>Create Object Type</h1>
		</div>
		<div class="modal-body row">
			<div class="col-md-5">
				<!--OBJECT CREATION BOX-->
				<div class="panel panel-default">
					<div class="panel-heading">
						Details
					</div>
					<div class="panel-body">
						<div class="input-group">
							<label for="name">Tile Name:</label>
							<br>
							<input type="text" name="tile_name" />
						</div>
						<div class="form-group">
							<label for="image_url">Image URL:</label>
							<br>
							<input type="text" name="image_url" />
						</div>
						<div class="form-group">
							<label for="bg_image_url">Background Image URL:</label>
							<br>
							<input type="text" name="bg_image_url" />
						</div>
						<br>
						<div class="bg_fg_tile">
							<img id="objectCreationBgImage" src="mapImages/Blank/blank0.png" alt="blank">
							<img id="objectCreationImage" src="mapImages/Blank/blank0.png" alt="blank">
						</div>
						<br>
						<label>Type:</label>
						<br>
						<select id="tyle-type-select">
						</select>
						<br>
						if portal, where to.
						<br>
						<div class="input-group">
							<label for="description">Description</label>
							<br>
							<textarea name="description" cols="40"></textarea>
						</div>
					</div>
				</div><!-- End panel -->
			</div> <!-- End details col -->
			<div class="col-md-7 col-xs-12">
				<div class="col-xs-6 no-pad pad-right">
					<div class="panel panel-default">
						<div class="panel-heading">
							Image Type
						</div>
						<div class="panel-body">
							<table id="tile_type_table" class="table">
								<tr><td> <div class="pointer" type="door">Door</div> </td></tr>
								<tr><td> <div class="pointer" type="wall">Wall</div> </td></tr>
								<tr><td> <div class="pointer" type="object">Object</div> </td></tr> 
								<tr><td> <div class="pointer" type="chest">Chest</div> </td></tr>
								<tr><td> <div class="pointer" type="special">Special/Interactable</div> </td></tr>
								<tr><td> <div class="pointer" type="background">Background</div> </td></tr>
								<tr><td> <div class="pointer" type="path">Path</div> </td></tr>
							</table>
						</div>
					</div>
				</div> <!-- End types col -->
				<div class="col-xs-6 no-pad pad-left">
					<div class="panel panel-default">
						<div class="panel-heading">
							Image
						</div>
						<div class="panel-body">
							<table id="tile_image_table" width="100%">
							</table>
						</div>
					</div>
				</div> <!-- End image col -->
			</div>
		</div> <!-- End content-->
		<div class="modal-footer">
			<button class="btn-warning" data-dismiss="modal">Discard</button>
			<button id="saveNewTile" class="btn-success">Save Object</button>
		</div><!-- End footer -->
	</div>
</div><!-- End modal -->