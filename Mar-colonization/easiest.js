var boardState = [];
var user;
var computer;
var x_player  = document.getElementById('x_player');
var o_player = document.getElementById('o_player');
var cells = document.querySelectorAll('.cell');



function main_easiest(){
	initialize_easiest();
	x_player.addEventListener('click',playGame_easiest);

}


function initialize_easiest(){
	for(let i=0;i<9;i++){
		boardState[i] = '';
	}
}


function playGame_easiest(){
	x_player.disabled = true;
	o_player.disabled = true;
	user = 'X';
	computer = 'O';
	
}