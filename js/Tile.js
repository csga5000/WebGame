function Tile()
{
	this.name = "";
	this.image = null;
	this.bg_image = null;
	this.type = -1;
	this.description = "";

	this.id = Tile.next_id;
	Tile.next_id++;
}
Tile.next_id = 0;