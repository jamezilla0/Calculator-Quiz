// We need to require in node's read line module, which will let us read console inputs
const readline = require('readline');
// Initialize a rl constant with a new readline interface
const rl = readline.createInterface({
	input: process.stdin, // This will read all console inputs for a console process
	output: process.stdout // This will be used to output text to the console
});
// This will be our quiz counter
var i = 0;

// Used to seperate quiz blocks.
var border = "\n======================\n";

// Used to create a random number between inserted min - max
var randomNumber = function(min, max){
	return Math.floor((Math.random() * max) + min);
}

// A class object for creating new problems
function Problem(){
	// Each time a new problem is created the first and second number will be changed, between their respective min and max numbers
	var firstNumber = randomNumber(1, 200)
	var secondNumber = randomNumber(1, 500);
	// This problems question will be formated using border, first and second number added followed by user input on a new line.
	this.question = `${border}|| ${firstNumber} + ${secondNumber}?\n|| Input: `;
	// This answer will be used for this problem when being checked.
	this.answer = firstNumber + secondNumber;
}
// Create a new porblem
var problem = new Problem();
// This function is used to ask new or previous questions
var ask = function(newQuestion){
	// Using a tenary operator I will either creatre a new problem or use the previous one based on if newQuestion is true
	problem = (newQuestion) ? new Problem() : problem;
	// All quizes will have a title of Quiz + i after incrementing the i variable by one.
	var title = "Quiz " + (++i);
	// Output this to console.
	console.log("\n" + title);
	// Set the prompt to the problems question
	rl.setPrompt(problem.question, problem.question.length);
	// Await for user input
	rl.prompt();
}

// After a line has been created (When user presses, enter)
rl.on('line', function(answer){
	//  Check if the answer matches the current problems answer.
	if(answer == problem.answer){
		// Add a correct identifier
		console.log("|| [Correct]" + border);
	}
	else {
		// else add a incorrect identifier
		console.log("|| [Incorrect]");
		// Show the right answer
		console.log("|| Answer: " + problem.answer + border);
	}
	// Ask a new question by passing in true for a new question.
	ask(true);

}).on('close', function(){
	// When Ctrl + C is entered quit the program and say thank you.
	console.log("Thank You Come Again");
	// End of program
});

// Initial start of program (Header would go here, or what ever you wish to show before quiz loop)
console.log("||\tJames Bernard's Math Quizes\t||");
// Start asking quiz questions
ask();