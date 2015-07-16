$('#createObjectModal').ready(function(){
	//TODO: listen to blur of image_url inputs and update image accorindly

	$('#tile_type_table').find('td').click(populateImageTable);

	$($('#tile_type_table').find('td')[0]).click();
});

//Image Elemnts
//Is there a way to access the number of files in a folder?

/*ANSWER*/
//http://stackoverflow.com/questions/11489738/how-do-i-count-files-in-a-directory-using-jquery
//Best answers: Mendhak's, and mplungjan's

var selectedImage, selectedBgImage = null;
var numberOfDoorImages = 3;
var numberOfWallImages = 18;
var numberOfObjectImages = 4;
var numberOfChestImages = 0;
var numberOfSpecialImages = 1;
var numberOfBackgroundImages = 3;
var numberOfPathImages = 14;

var openType;

var backgroundTypes = ['background'];

function populateImageTable()
{
	openType = $(this).find('div[type]').attr('type');

	var numberOfImages
	switch (openType){
		case 'door':
			numberOfImages = numberOfDoorImages;
			break;
		case 'wall':
			numberOfImages = numberOfWallImages;
			break;
		case 'object':
			numberOfImages = numberOfObjectImages;
			break;
		case 'chest':
			numberOfImages = numberOfChestImages;
			break;
		case 'special':
			numberOfImages = numberOfSpecialImages;
			break;
		case 'background':
			numberOfImages = numberOfBackgroundImages;
			break;
		case 'path':
			numberOfImages = numberOfPathImages;
			break;
		default: numberOfImages = 0;
			break;
	}//end switch

	var table = $("#tile_image_table");

	table.find('tr').remove();//Slightly easier, eh?

	var tr, td;

	for (var i = 0; i < numberOfImages; i++)
	{
		//Add rows
		if (i % 3 === 0)
		{
			tr = $('<tr/>');

			table.append(tr);
		}

		var item = $('<img class="tile_image" />');

		//Setup items
		item.attr('src','mapImages/'+openType+'s/'+openType+i+'.png');
		item.attr('onclick','selectImage(this);');//I should have used item.click(eventFunction)
		item.attr('alt',openType+' '+i);
		item.css('border-width', "3px");

		td = $('<td/>')
			.append(item);

		tr.append(td);
	}

	//var table = $('#imageTable')[0];//Gets the dom element
	/*//delete rows <-- Bugs
	for (var i = 0; i < table.rows.length; i++){
		for (var j = 0; j < table.rows[i].cells.length; j++)
			table.rows[i].deleteCell(j)
		table.deleteRow(0);
	}*/

	/*//Repopulate list <-- Bugs
	var h = 0
	for (var i = 0; i < (numberOfImages/3+1); i++) {
		var row = table.insertRow(i);
		for (var j = 0; j < 3 && h < numberOfImages; j++) {
			row.insertCell(j).innerHTML = "<img src='mapImages/" + type + "s/" + type + h + ".png' onclick='selectImage(this)' alt='"+type+"'class = 'tile'>";
			h++;
		}//end for
	}//end for*/
}

function selectImage(image)
{
	//If it's in backgrounds array
	if (backgroundTypes.indexOf(openType) != -1) {
		if (selectedBgImage != null) {
			unselectImage(selectedBgImage);
		}

		$("#objectCreationBgImage").attr('src',image.src);
		$("#createObjectModal [name=bg_image_url]").val(image.src);

		selectedBgImage = image;
	}
	//Must be forground
	else {
		if (selectedImage != null) {
			unselectImage(selectedImage);
		}

		$("#objectCreationImage").attr('src',image.src);
		$("#createObjectModal [name=image_url]").val(image.src);

		selectedImage = image;
	}

	$(image).css('border', "3px inset #8888FF");
}

function unselectImage(image)
{
	image.style.border = "none";
}

function getTile()
{
	var t = new Tile();
	t.image = $('[name="image_url"]').val();
	t.bg_image = $('[name="bg_image_url"]').val();
}