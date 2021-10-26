// global game variables
var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playButton, playeroScore, player1Score, draw;

player = 0;

fields = [];
fields = document.getElementsByTagName('td');
console.log(fields);

fieldsPlayed = [];
fieldsPlayer0 = [];
fieldsPlayer1 = [];

   //Local storage variables
   playeroScore = 0;
   player1Score = 0;
   draw = 0;

   //Local storage - store data
   localStorage.getItem('playeroLS');
   localStorage.getItem('player1LS');
   localStorage.getItem('drawLS');

   if (localStorage.getItem('playeroLS') !== 0) {
       playeroScore = Number(localStorage.getItem('playeroLS'));
   }
   
   if (localStorage.getItem('player1LS') !== 0) {
       player1Score = Number(localStorage.getItem('player1LS'));
   }
   
   if (localStorage.getItem('drawLS') !== 0) {
       draw = Number(localStorage.getItem('drawLS'));
   }

   //Display scores
   document.getElementById('player_o').innerHTML = 'PLAYER O: ' + Number(localStorage.getItem('playeroLS'));
   document.getElementById('player_1').innerHTML = 'PLAYER X: ' + Number(localStorage.getItem('player1LS'));
   document.getElementById('draw_show').innerHTML = 'DRAW: ' + Number(localStorage.getItem('drawLS'));
  

   msg = document.getElementById('msg');
   playButton = document.getElementById('playAgain').addEventListener('click', playAgain);

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', play)
}




function play() {
    // game core mechanics, marking the fields
    //console.log('Are you talking to me?');
    if (fieldsPlayed.includes(this.id)) {
        alert('No can do!')
    }
    if (player === 0 && !fieldsPlayed.includes(this.id)) {
        this.innerHTML = 'X';
        this.style.color = '#55aa95';
        fieldsPlayer0.push(parseInt(this.id));
        player = 1
        document.getElementById("h3turn").innerHTML = `It is now O's turn to play`;

    } else if (player === 1 && !fieldsPlayed.includes(this.id)) {
        this.innerHTML = 'O';
        this.style.color = '#55aa95';
        fieldsPlayer1.push(parseInt(this.id));
        player = 0
        document.getElementById("h3turn").innerHTML = `It is now X's turn to play`;
    }

    fieldsPlayed.push(this.id);
    console.log(fieldsPlayed);

    win()
}

function win() {
    // analyzing field choices, winning conditions, feedback
    if (
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) ||
        fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
        fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
        fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7)
    ) {
        // player 0 won
        msg.innerHTML = 'Player X won!';
        player1Score++;
        document.getElementById("h3turn").style.display = "none";
        gameOver();
        gameStats();

    } else if (
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
        fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
        fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
        fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)
    ) {
        // player 1 won
        msg.innerHTML = 'Player O won!'
        playeroScore++;
        document.getElementById("h3turn").style.display = "none";
        gameOver();
        gameStats();
    } else if (fieldsPlayed.length == 9) {
        // game is a draw
        msg.innerHTML = 'It\'s a draw!'
        draw++;
        document.getElementById("h3turn").style.display = "none";
        gameOver();
        gameStats();
    }
    
}

function gameOver() {
    // ending the game 
    for (let i = 0; i < fields.length; i++) {
        fields[i].removeEventListener('click', play)
    }

}

function playAgain() {
    // restart the game
    window.location.reload(true)
}


function gameStats() {
    // game stats using local storage
    localStorage.setItem('playeroLS', playeroScore);
    localStorage.setItem('player1LS', player1Score);
    localStorage.setItem('drawLS', draw);

    localStorage.playeroLS = Number(localStorage.playeroLS);
    localStorage.player1LS = Number(localStorage.player1LS);
    localStorage.drawLS = Number(localStorage.drawLS);

    document.getElementById('player_o').innerHTML = 'PLAYER O: ' + localStorage.playeroLS;
    document.getElementById('player_1').innerHTML = 'PLAYER X: ' + localStorage.player1LS;
    document.getElementById('draw_show').innerHTML = 'DRAW: ' + localStorage.drawLS;
}


// end game button
const endButton = document.querySelector('#endGame');

const refreshPage = () => {
  location.reload();
}

endButton.addEventListener('click', refreshPage)

