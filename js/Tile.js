//add portalDestination, state
function Tile(type)
{
	this.name = "";
	this.image = null;
	this.bg_image = null;
	this.type = type;
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

Tile.TYPE_DOOR = 0;
Tile.TYPE_WALL = 1;
Tile.TYPE_PORTAL = 2;
Tile.TYPE_SWITCH = 3;
Tile.TYPE_INTERACTABLE = 4;
Tile.TYPE_PLAYER = 5;

Tile.TYPE_NAMES = [];
Tile.TYPE_NAMES[Tile.TYPE_DOOR] = 'Door';
Tile.TYPE_NAMES[Tile.TYPE_WALL] = 'Wall';
Tile.TYPE_NAMES[Tile.TYPE_PORTAL] = 'Portal';
Tile.TYPE_NAMES[Tile.TYPE_SWITCH] = 'Switch';
Tile.TYPE_NAMES[Tile.TYPE_INTERACTABLE] = 'Interactable';
Tile.TYPE_NAMES[Tile.TYPE_PLAYER] = 'Player';