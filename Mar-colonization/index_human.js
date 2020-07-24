var boxes = document.querySelectorAll('.cell');
var user1 ;
var user2;
var numMoves = 0;
var flag_play1 = 0;
var flag_play2 = 0;
var boardState = [];
var val;
var winner = '';
var turnSequence = [];
var winningLine = [[0,1,2],[0,3,6],[3,4,5],[1,4,7],[6,7,8],[2,5,8],[0,4,8],[2,4,6]];
var winLine = [];
var current_user = [];
var user1_score = 0;
var user2_score = 0;
var hint = document.getElementById('hint');
var player_selection = document.getElementById('player_selection');




function main_human(){
	//console.log("i reached the main_human successfully");
	init_human();
	var reset = document.getElementById('reset');
	var x_player = document.getElementById('x_player');
	var o_player = document.getElementById('o_player');

	x_player.addEventListener('click',()=>{
		x_player.disabled = true;
		o_player.disabled = true;
		user1 = 'X';
		user2 = 'O';
		current_user = 'X';
		setTurn('X');
		initiate_players(user1,user2);
		player_selection.innerHTML = '';
		turnSequence = ['X','O','X','O','X','O','X','O','X'];
	});

	o_player.addEventListener('click',()=>{
		x_player.disabled = true;
		o_player.disabled = true;
		user1 = 'O';
		user2 = 'X';
		current_user = 'X';
		setTurn('X');
		initiate_players(user1,user2);
		player_selection.innerHTML = '';
		turnSequence = ['X','O','X','O','X','O','X','O','X'];
	});

	reset.addEventListener('click',()=>{
		x_player.disabled = false;
		o_player.disabled = false;
		user1 = '';
		user2 = '';
		flag = 0;
		winner = '';
		winLine = '';
		numMoves = 0;
		setTurn('');
		player_selection.innerHTML = 'Player1 select your letter';
		boxes.forEach((cell)=>{
			cell.innerHTML = '';
			cell.classList.remove('box-win');
			cell.classList.remove('box-hint');
			cell.removeEventListener('click',()=>{
				if(boardState[parseInt(cell.id)] == '' && current_user!='' && numMoves<9){
				numMoves++;
				playGame(parseInt(cell.id));
			}
			});
		});
		document.getElementById("win").innerHTML = '';
		main_human();

	});	

	hint.addEventListener('click',getHint);


	boxes.forEach((cell)=>{
	cell.addEventListener('click',()=>{
			cell.classList.remove('box-hint');
			if(boardState[parseInt(cell.id)] == '' && current_user!='' && numMoves<9 &&winner == ''&&user1!=''&&user2!=''){
				numMoves++;
				playGame(parseInt(cell.id));
			}
		});
});
	
}

	
function getHint(){
	if(numMoves<9 && winner ==''){
		var temp1 = current_user;//first will be in support of us
		var temp2;
		if(current_user == 'X'){
			temp2 = 'O';
		}else{
			temp2 = 'X';
		}
		initiate_players(temp1,temp2);
		var pos = findBestMove(boardState);
		document.getElementById(pos).classList.add('box-hint');
		}
		boxes.forEach((cell)=>{
		cell.addEventListener('click',()=>{
			document.getElementById(pos).classList.remove("box-hint");
		});
	})
}
	



function init_human(){
	for (let i=0;i<9;i++){
		boardState[i] = '';
	}
}

function playGame(id){
	document.getElementById(id).innerHTML = current_user;
	boardState[id] = current_user;
	var flag = getResults_human(boardState);
	if(flag == 2){
		if(current_user == 'X'){
			current_user = 'O';
			setTurn('O');
		}else{
			current_user = 'X';
			setTurn('X');
		}

	}
}





function getResults_human(currentBoardState){
	let line = [];
	for(let i =0;i<winningLine.length;i++){
		line = winningLine[i];
		if(currentBoardState[line[0]]==currentBoardState[line[1]]&&
			currentBoardState[line[1]]==currentBoardState[line[2]]&&
			currentBoardState[line[0]]!=''){
			winner = currentBoardState[line[0]];
			winLine = line;
			break;
		}

	}
	if(winner!=''){
		win(winLine);
		if(winner == user1){
			document.getElementById("userscore").innerHTML = ++user1_score
		}else{
			document.getElementById("compscore").innerHTML = ++user2_score;
		}
		return 0; //win condition
	}else if(winner == ''&& numMoves == 9){
		document.getElementById('win').innerHTML = "It is a Draw match";
		return 1;// draw
	}else{
		return 2;//not yet reached terminal
	}
}


