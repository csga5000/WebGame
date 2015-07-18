//add portalDestination, state
function Tile()
{
	this.name = "";
	this.image = null;
	this.bg_image = null;
	this.type = Tile.TYPE_PLAYER;
	this.description = "";

	this.id = Tile.next_id;
	Tile.next_id++;

	this.getImageDiv = function() {
		var div = $('<div class="bg_fg_tile"></div>');
		div.css('width','100%').css('height','100%');
		div.append(
			$('<img />').css('width','100%').css('height','100%').attr('src',this.bg_image)
		);
		div.append(
			$('<img />').css('width','100%').css('height','100%').attr('src',this.image)
		);
		return div;
	}
}
Tile.next_id = 0;

Tile.TYPE_DOOR = 'Door';
Tile.TYPE_WALL = 'Wall';
Tile.TYPE_PORTAL = 'Portal';
Tile.TYPE_SWITCH = 'Switch';
Tile.TYPE_INTERACTABLE = 'Interactable';
Tile.TYPE_PLAYER = 'Player';