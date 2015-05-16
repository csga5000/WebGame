
function populateImageTable(type){
	var numberOfImages
	switch (type){
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
  	  	case 'portal': 
  	  		numberOfImages = numberOfPortalImages;
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

	var table = /*$("#imageTable");*/ document.getElementById("imageTable");

	//delete rows
	for (var i = 0; i < table.rows.length; i++){
		for (var j = 0; j < table.rows[i].cells.length; j++)
			table.rows[i].deleteCell(j)
	table.deleteRow(0);
	}

	//Repopulate list
	var h = 0
	for (var i = 0; i < (numberOfImages/3+1); i++){
   	 	var row = table.insertRow(i);
    	for (var j = 0; j < 3 && h < numberOfImages; j++){
    		row.insertCell(j).innerHTML = "<img src='mapImages/" + type + "s/" + type + h + ".png' onclick='selectImage(this)' alt='"+type+"'class = 'tile'>";
    		h++;
    	}//end for
	}//end for
}

function selectImage(image){
	if (selectedImage != null){
		unselectImage(selectedImage);
	}
	document.getElementById("objectCreationImage").src = image.src; 
	selectedImage = image;
	selectedImageSrc = image.src; 
	image.style.border = "3px inset #8888FF";
}

function unselectImage(image){
	image.style.border = "none";
}