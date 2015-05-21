function Viewport(obj) {
	this.w = 25;
	this.h = 10;
	this.cust_tsize = 0;
	this.mapsize = 100;

	this.uptimeout = null;

	//If obj is sepcified copies values from obj
	for(var val in obj) {
		this[val] = obj[val];
	}

	this.resizeViewport = function() {
		this.mapsize = Number($('#resizeViewport').val());
		if (this.mapsize === 0 || this.mapsize > 100)
			this.mapsize = 100;

		window.clearTimeout(this.uptimeout);
		this.uptimeout = window.setTimeout(this.udpateViewport, 500);
	}

	this.udpateViewport = function(){
		$('#mapBuilderContent').css('width', mapsize+'%');
		setMapTiles();
	}

	this.resizetimeout = null;
	this.resizeTiles = function(elem) {
		this.cust_tsize = Number($('#resizeTiles').val());

		window.clearTimeout(this.resizetimeout);
		this.resizetimeout = window.setTimeout(this.setMapTiles, 500);
	}

	//Fixes bug with shrinking webpage
	this.setMapTilesWithTimeout = function() {
		$('#mapTiles').width($(window).width()/2);
		setTimeout(this.setMapTiles,100);
	}

	this.setMapTilesFromInputs = function(){
		this.w = $('#mapW').val();
		this.h = $('#mapH').val();

		this.setMapTiles();
	}

	this.setMapTiles = function() {
		var map = $('#mapTiles');
		var tsize = this.cust_tsize ? this.cust_tsize : Math.floor($('#mapBuilderContent').width()/this.w);

		var aty, atx;

		for (var y = 0; true; y++) {
			aty = $('.map-row[y='+ y +']');//Evaluates to something like $('div[y=5]')
			if (!(y < this.h || aty.length))
				break;

			if(y >= this.h) {
				aty.remove();
			}
			else {
				if (!aty.length) {
					aty = $('<div class="map-row" y="'+ y +'">');
					map.append(aty);
				}
				for (var x = 0; true; x++) {
					atx = $('div[x='+ x +'][y='+ y +']');//Evaluates to something like $('div[x=5][y=5]')
					if (!(x < this.w || atx.length))
						break;

					if(!atx.length) {
						var elem = $('<div class="mapTile"></div>');
						elem.attr('x',x);
						elem.attr('y',y);

						elem.click(mapTileClicked);

						aty.append(elem);
					}
					else if(x >= this.w)
						atx.remove();
				}
			}
		}

		$('.mapTile').css('width', tsize).css('height', tsize);

		map.width(tsize*this.w);
	}
}