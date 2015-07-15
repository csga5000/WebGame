function Tile()
{
	this.name = "";
	this.image = null;
	this.bg_image = null;
	this.type = -1;
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

Tile.TYPE_DOOR = 1;
Tile.TYPE_WALL = 4;
Tile.TYPE_PORTAL = 2;
Tile.TYPE_INTERACTABLE = 3;
