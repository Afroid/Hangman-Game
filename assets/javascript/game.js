var data = [
  	["S", "P", "A", "G", "H", "E", "T", "T", "I"],
  	["H", "A", "M", "B", "U", "R", "G", "E", "R"],
  	["A", "P", "P", "L", "E", "S"],
  	["O", "R", "A", "N", "G", "E", "S"],
  	["R", "I", "B", "E", "Y", "E"],
  	["C", "H", "E", "E", "S", "E", "C", "A", "K", "E"]
]

//Global variables
var random, hangmanWord, underscoreArray, counter, winsCounter=0, remainingCounter, userInputArray, 
	remainingGuesses, remainingCount, userText, textNode, wins, incorrectLetters, incorrectCount;

function setTheGameUp(){
	random = Math.floor((Math.random()*(data.length-1))); 

	hangmanWord = data[random]; //chooses a random word to guess in the array above
	underscoreArray = new Array(hangmanWord.length);
	counter = 0, remainingCounter = 6;
	userInputArray = [];


	//The area to guess has to be filled in with underscores so this creates an array of the 
	//same length but with only "_ " for each index
	for (var i = 0; i < underscoreArray.length; i++){
		underscoreArray[i] = "_ ";
	}

	//Put "O" in for initial wins
	if(winsCounter === 0){
		wins = document.getElementById("wins");
		textNode = document.createTextNode(winsCounter);
		wins.appendChild(textNode);		
	}


	//Put "6" in for remaining guesses
	remainingGuesses = document.getElementById("remainingGuesses");
	remainingCount = document.createTextNode("Number of Guesses Remaining: " + remainingCounter);
	remainingGuesses.appendChild(remainingCount);

	incorrectLetters = document.getElementById("incorrectLetters");
	textNode = document.createTextNode("Letters Already Guessed: ");
	incorrectLetters.appendChild(textNode); 
}

//Displays the underscore array created above
function printTheUnderscoreArray(){
	for (var i = 0; i < underscoreArray.length; i++){
		userText = document.getElementById("userText");
		textNode= document.createTextNode(underscoreArray[i]);
		userText.appendChild(textNode);
	}
}

//Removes the original underscore array created above
function removeTheUnderscoreArray(){
	var theArea = document.getElementById("userText");
	theArea.innerHTML="";
}

//Removes the content from Letters already guessed
function removeTheContent(){
	var theArea = document.getElementById("userText");
	theArea.innerHTML="";
	var theILArea = document.getElementById("incorrectLetters");
	theILArea.innerHTML="";
}

//Looks to see if the users input matches anything in the hangmanWord array
// When the user presses a key, it will run the following function...
document.onkeyup = function(event) {
    
    var userGuess = event.key;// Determine which key was pressed
	userInput = userGuess.toUpperCase();

	userInputArray.push(userInput);

	for (var i = 0; i < hangmanWord.length; i++){
		if(hangmanWord[i] === userInput){
			underscoreArray[i] = userInput + " ";
			var myBool = true;
		}
	}
	
	//Clears the contents of the Guess Field to nothing
	removeTheUnderscoreArray();
	// removeTheContent("userText); //Had this here in case I was going to modularize it some more.
	printTheUnderscoreArray();
	
	//If an incorrect guess is entered, the letter is displayed, and hangman "grows"
	if(!myBool){
		// for(var i = 0; i < userInputArray.length; i++){
			// if(userInputArray[i] !== userInput){
				incorrectLetters = document.getElementById("incorrectLetters");
				textNode = document.createTextNode(" " + userInput);
				incorrectLetters.appendChild(textNode); 
				incorrectCount++;


				remainingCounter--;
				remainingGuesses = document.getElementById("remainingGuesses");
				remainingCount = document.createTextNode("Number of Guesses Remaining: " + remainingCounter);
				remainingGuesses.removeChild(remainingGuesses.childNodes[0]);
				remainingGuesses.appendChild(remainingCount);

				counter++;

				//The little hangman was from this code snippet. 
				//https://codepen.io/offline_blogger/pen/Kedtr
				var hangman = document.getElementById("hangman");
		    	hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + counter + ".png";
			// }
		// }

	}
	
	//Checks to see if all letters have been found
	var flag = true;
	for (var i = 0; i < underscoreArray.length; i++){
		if(underscoreArray[i] === "_ "){
			flag = false;
		}
	}

	if(flag){
		window.alert("You avoided being hung!");
		
		winsCounter++;
		wins = document.getElementById("wins");
		textNode = document.createTextNode(winsCounter);
		wins.removeChild(wins.childNodes[1]);
		wins.appendChild(textNode);
		
		remainingGuesses.removeChild(remainingGuesses.childNodes[0]);

		removeTheUnderscoreArray();
		// removeTheContent("userText"); //Had this here in case I was going to modularize it some more.
		removeTheContent();
		setTheGameUp(); 
		printTheUnderscoreArray();	
	}
	
 	//Once you get to six, all of the user is drawn and "hung"
	if(counter === 6){
		window.alert("You've been hung.");
		
		wins = document.getElementById("wins");
		textNode = document.createTextNode(winsCounter);
		wins.removeChild(wins.childNodes[1]);
		wins.appendChild(textNode);
	
		remainingGuesses.removeChild(remainingGuesses.childNodes[0]);
		removeTheUnderscoreArray();	
		// removeTheContent("userText"); //Had this here in case I was going to modularize it some more.
		removeTheContent();
		setTheGameUp();
		printTheUnderscoreArray();
	}
}

function init(){
	setTheGameUp();
	printTheUnderscoreArray();
}

window.onload = init;