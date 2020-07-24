var x_player_computer = document.getElementById("x_player_computer");
var o_player_computer = document.getElementById("o_player_computer");
var turn = document.getElementById('turn');
var comp= '';
var user = '';
var cells = document.querySelectorAll('.cell');
//var currentBoardState = [];
var moveCount = 0;
var winner = '';
var winLine='';
var body = document.getElementById('#board');
var reset = document.getElementById('reset');
var winDisplay = document.getElementById('win');
var userScore=0;
var compScore=0;
var scoreC = document.getElementById('compscore');
var scoreU = document.getElementById('userscore');
var flag = 0; // checks if we got the winner
var flag1 = 0;//denotes whether is human human 
var gameType = document.getElementById("gameType");
var humanVScomputer = document.getElementById("humanVScomputer");
var hint = document.getElementById("hint");
var radioChecked;

var levelChange = document.getElementById('level_change');
var boardState = [];
var notSelected;
var flag_level = 0;
var levels_input = document.getElementsByName('choice');
var winningLine = [];
var count_alert =0;
winningLine = [[0,1,2],[0,3,6],[3,4,5],[1,4,7],[6,7,8],[2,5,8],[0,4,8],[2,4,6]];


//audio 
function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

//fullscreen

var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// themes
function changeimg1(){
	document.body.style.backgroundImage="url(Images/background1.jpg)";
}

function changeimg2(){
	document.body.style.backgroundImage="url(Images/background2.jpg)";
}

function changeimg3(){
	document.body.style.backgroundImage="url(Images/background3.jpg)";
}


//checks which depth has been selected
function radioButtonCheck(){
	var element = document.getElementsByName("choice");
	for(let i=0;i<element.length;i++){
		if(element[i].checked){
			return element[i].id;
		}
	}
}


// tells whose turn it is to play
function setTurn(current_player){
	var temp = "Turn: "
	document.getElementById("turn").innerHTML = temp.concat(current_player);
}


//main for single player
function main_levels(){
	console.log("hey i am dumb are you also??");
	
	//gameType.disabled = true;
	radioChecked = radioButtonCheck();
	//console.log(radioChecked);
	intialize_level();
	moveCount = 0;
	cells.forEach((cell)=>{
		cell.innerHTML = '';
	});

	x_player_computer.addEventListener('click',()=>{
		x_player_computer.disabled = true;
		o_player_computer.disabled = true;
		//disable the buttons
		user = 'X';
		comp = 'O';
		radioChecked = radioButtonCheck();
		initiate_players(comp,user);
		setTurn(user);

	});

	o_player_computer.addEventListener('click',()=>{
		o_player_computer.disabled = true;
		x_player_computer.disabled = true;
		//disable the buttons
		user = 'O';
		comp = 'X';
		setTurn(comp);
		radioChecked = radioButtonCheck();
		if(radioChecked == 'easiest'){
			var pos = easiest(boardState);
		}else if(radioChecked == 'better'){
			var pos = medium(boardState);
		}else if(radioChecked == 'hard'){
			var pos = hard(boardState)
		}else if(radioChecked == 'extremely-hard'){
			initiate_players(comp,user);
			var pos = findBestMove(boardState);
		}
		boardState[pos] = comp;
		cells[pos].innerHTML = 'X';
	});

	cells.forEach((cell)=>{
		cell.addEventListener('click',()=>{
			if(cell.innerHTML === ''&& user!=''&&moveCount<9){
				moveCount++;
				if(flag_level == 0){
					cell.innerHTML = user;
					boardState[parseInt(cell.id)] = user;
					getResults_levels(boardState);// have to check it again

				}
				
				if(winner==='' && moveCount<9){
					setTurn(comp);
					moveCount++;
					if(radioChecked == 'easiest'){
						var pos = easiest(boardState);
					}else if(radioChecked == 'better'){
						var pos = medium(boardState);
					}else if(radioChecked == 'hard'){
						var pos = hard(boardState);
					}else if(radioChecked == 'extremely-hard'){
						initiate_players(comp,user);
						var pos = findBestMove(boardState);
					}
					if(flag_level == 0){
						boardState[pos] = comp;
						cells[pos].innerHTML = comp;
						getResults_levels(boardState);	
					}
					setTurn(user);
				}
			}
		});
	});
	
	hint.addEventListener('click',getHint_computer);
	reset.addEventListener('click',reset_level);
	levels_input.forEach((level)=>{
		level.addEventListener('click',()=>{
			radioChecked = radioButtonCheck();
			var temp1 = user;
			var temp2 = comp;
			reset_level();
			user = temp1;
			comp = temp2;
			
			if(user!=''&&comp!=''){
				if(count_alert==0){
					alert('Click the "Restart" button if you want to change the first player');
					count_alert++;
				}
			x_player_computer.disabled = true;
			o_player_computer.disabled = true;
		}
			if(comp=='X'){
				moveCount++;
					if(radioChecked == 'easiest'){
						var pos = easiest(boardState);
					}else if(radioChecked == 'better'){
						var pos = medium(boardState);
					}else if(radioChecked == 'hard'){
						var pos = hard(boardState);
					}else if(radioChecked == 'extremely-hard'){
						initiate_players(comp,user);
						var pos = findBestMove(boardState);
					}
					if(flag_level == 0){
						boardState[pos] = comp;
						cells[pos].innerHTML = comp;
						getResults_levels(boardState);	
					}
					setTurn(user);

			}


		});
	});


}

//hints against the computer
function getHint_computer(){
	if(winner == ''&& moveCount<9 && comp!='' &&user!=''){
	initiate_players(user,comp);
	var pos = findBestMove(boardState);
	initiate_players(comp,user);
	document.getElementById(pos).classList.add('box-hint');
	cells.forEach((cell)=>{
		cell.addEventListener('click',()=>{
			document.getElementById(pos).classList.remove("box-hint");
		});
	})
}
}



function reset_level(){
	boardState = ['','','','','','','','',''];
	x_player_computer.disabled = false;
	o_player_computer.disabled = false;
	winner = '';
	winDisplay.innerHTML = 'The Winner is:';
	moveCount = 0;
	user = '';
	comp = '';
	flag_level = 0;
	winDisplay.innerHTML = '';
	setTurn('');
	radioChecked = radioButtonCheck();
	cells.forEach((cell)=>{
		cell.innerHTML = '';
		cell.classList.remove('box-win');
		cell.classList.remove('box-hint');
		cell.classList.add('box-reset');
	});
}


//function with moderate level, this will only block the opponent from making a winning move but wont make a winning move
function medium(currentBoardState){
	var line = [];
	for (let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(currentBoardState[line[0]] == currentBoardState[line[1]] &&
		 currentBoardState[line[0]]!='' && currentBoardState[line[0]] == user && currentBoardState[line[2]] == ''){
			return line[2];

		}else if(currentBoardState[line[1]] == currentBoardState[line[2]] && 
			currentBoardState[line[1]]!='' && currentBoardState[line[1]] == user && currentBoardState[line[0]] ==''){
			return line[0];
		}else if(currentBoardState[line[0]] == currentBoardState[line[2]] && 
			currentBoardState[line[0]]!='' && currentBoardState[line[2]] == user && currentBoardState[line[1]] == ''){
			return line[1];
		}
	}
	for(let i=0;i<9;i++){
		if(currentBoardState[i]==''){
			return i;
		}
	}

}

function hard(currentBoardState){
	var line; // this is for countering the opponent
	//checking if any move of the user can make user win
	

	// this loop will check whether any move can make the computer win
	for(let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(currentBoardState[line[0]] == currentBoardState[line[1]] &&
		 currentBoardState[line[0]]!='' && currentBoardState[line[0]] == comp && currentBoardState[line[2]] == ''){
			return line[2];

		}else if(currentBoardState[line[1]] == currentBoardState[line[2]] && 
			currentBoardState[line[1]]!='' && currentBoardState[line[1]] == comp && currentBoardState[line[0]] ==''){
			return line[0];
		}else if(currentBoardState[line[0]] == currentBoardState[line[2]] && 
			currentBoardState[line[0]]!='' && currentBoardState[line[2]] == comp && currentBoardState[line[1]] == ''){
			return line[1];
		}

	}

	for (let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(currentBoardState[line[0]] == currentBoardState[line[1]] &&
		 currentBoardState[line[0]]!='' && currentBoardState[line[0]] == user && currentBoardState[line[2]] == ''){
			return line[2];

		}else if(currentBoardState[line[1]] == currentBoardState[line[2]] && 
			currentBoardState[line[1]]!='' && currentBoardState[line[1]] == user && currentBoardState[line[0]] ==''){
			return line[0];
		}else if(currentBoardState[line[0]] == currentBoardState[line[2]] && 
			currentBoardState[line[0]]!='' && currentBoardState[line[2]] == user && currentBoardState[line[1]] == ''){
			return line[1];
		}
	}
	//no above condition return an empty box then
	for(let i=0;i<9;i++){
		if(currentBoardState[i] == ''){
			return i;
		}
	}
}


function intialize_level(){
	for(let i=0;i<9;i++){
		boardState[i]='';
	}
}

function getResults_levels(currentBoardState){
	winLine = null;
	for(let i =0;i<winningLine.length;i++){
		let line_level = winningLine[i];
		if(currentBoardState[line_level[0]]==currentBoardState[line_level[1]]&&
			currentBoardState[line_level[1]]==currentBoardState[line_level[2]]&&
			currentBoardState[line_level[0]]!=''){
			var won =line_level;
			winner = currentBoardState[line_level[0]];
			break;
		}
	}
	if(moveCount == 9 && winner == ''){
		winDisplay.innerHTML = 'It is a draw match';
		for(let i=0;i<9;i++){
			document.getElementById(i).classList.remove('cell:hover');
			document.getElementById(i).classList.add('box-cancel');
			document.getElementById(i).classList.remove('box-reset');
			document.getElementById(i).disabled = true;
		}
		setTurn('');
	}
	if(winner!=''){
		flag_level = 1;
		if(winner == user){
			scoreU.innerHTML = ++userScore;
		}else{
			scoreC.innerHTML = ++compScore;
		}
		win(won);
	}
}

		

function easiest(currentBoardState){
	for(let i=0;i<9;i++){
		if(currentBoardState[i]===''){
			return i;
		}
	}
}



function getResults(){
	if(moveCount==9 && winner==''){
		winDisplay.innerHTML = "It is a Draw!!";
		setTurn('');
	}
	winLine = null;
	for(let i=0;i<winningLine.length;i++){
		let line = winningLine[i];
		if(currentBoardState[line[0]]==currentBoardState[line[1]]&&
			currentBoardState[line[1]]==currentBoardState[line[2]]&&
			currentBoardState[line[0]]!=''){
			winLine=line;
			winner = currentBoardState[line[0]];
			break;
		}
	}
	if(winner!=''){
		if(winner==user){
			scoreU.innerHTML = ++userScore;
		}else{
			scoreC.innerHTML = ++compScore;
		}
		win(winLine);
	}
}

function win(line){
	var tem = "The winner is "
	winDisplay.innerHTML =tem.concat(winner);
	flag = 1;
	for(let i = 0;i<line.length;i++){
		document.getElementById(line[i]).classList.remove('cell:hover');
		document.getElementById(line[i]).classList.add('box-win');
	}

	for(let i=0;i<9;i++){
		document.getElementById(i).classList.remove('cell:hover');
		document.getElementById(i).classList.add('box-cancel');
		document.getElementById(i).classList.remove('box-reset');
		document.getElementById(i).disabled = true;
	}

}
