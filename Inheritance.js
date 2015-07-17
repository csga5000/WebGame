function Mammal(){
	var privateVar = 0;

	this.public_var = 1;

	//Unchangable ever by anything
	this.eat = function(){
		console.log("I'm eatin");
	}

	this.whatsVar = function() {
		console.log(this.public_var);
	}
}

Mammal.prototype.inheritable = function(){
	console.log("I am not a child!");
}

function Cat(){}

//This is "Cat extends Mammal"
Cat.prototype = new Mammal();

Cat.prototype.inheritable = function(){
	console.log("I am a child!!!");
}

var mam = new Mammal();
mam.public_var = 2;

var cat = new Cat();
cat.public_var = 45;

mam.whatsVar();//2
cat.whatsVar();//45
mam.inheritable();//I am not a child!
cat.inheritable();//I am a child!!!
cat.eat();//I'm eatin

/*
Outputs:
2
45
I am not a child!
I am a child!!!
I'm eatin
*/