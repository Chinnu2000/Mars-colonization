var winningLine = [];
winningLine = [[0,1,2],[0,3,6],[3,4,5],[1,4,7],[6,7,8],[2,5,8],[0,4,8],[2,4,6]]; //all possible  winning patterns
var max_depth = 2;
var count = 0;
var best_move = [];


function initiate_players(comp,user){
	player = comp;
	opponent = user;
}

function findBestMove(currentBoardState){
	var bestMove = -Infinity;
	let pos = -1;
	let val ;
	for(let i=0; i<9 ;i++){
		if(currentBoardState[i]===''){
			currentBoardState[i] = player;
			val = minimax(currentBoardState,0,false);//return the value for the current state of the board
			currentBoardState[i]='';

			if(val>bestMove ){
				bestMove = val;
				
				pos = i;
			}
		}
	}
	count=0;
	//console.log()
	return pos;
}

function minimax(currentBoardState,depth,isMax){
	let score = checkVictory(currentBoardState);
	let val;
	
	if(score == 10){
		return score - depth ; //score for computer winning
	}
	else if(score == -10){
		return depth+score; //
	}
	else if(!isCellEmpty(currentBoardState)){
		return 0;
	}

	else{
		if(isMax){
			let bestVal = -Infinity;
			for(let i=0;i<9;i++){
				if(currentBoardState[i]==''){
					currentBoardState[i] = player;
					val = minimax(currentBoardState,depth+1,!isMax);

					if(val>bestVal){
						bestVal = val;
					}
					currentBoardState[i] = '';
				}
			}
			return bestVal;

		}
		else{
			let bestVal = Infinity;
			for (let i=0;i<9;i++){	
				if(currentBoardState[i]==''){
					currentBoardState[i] = opponent;
					val = minimax(currentBoardState,depth+1,!isMax);
					if(val<bestVal){
						bestVal = val; 
					}
					currentBoardState[i] ='';
				}
			}
			return bestVal;
		}
	}

}


function checkVictory(currentBoardState){
	let winner = '';
	var line=[];
	for (let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(currentBoardState[line[0]]==currentBoardState[line[1]]&&
			currentBoardState[line[1]]==currentBoardState[line[2]]&&
			currentBoardState[line[0]]!=''){
			winner = currentBoardState[line[0]];
			break;
		}
	}
	if(winner == player){
		return 10; // since computer has to be the maximizer
	}
	else if(winner == opponent){
		return -10;
	}
	else{
		return 0;
	}

}

function isCellEmpty(currentBoardState){
	for (let i=0;i<9;i++){
		if(currentBoardState[i]==''){
			return true;
		}
	}
	return false;
}
