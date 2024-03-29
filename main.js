
let countdown; // to start countdown
let hiddenSolution; //to randomly select a solution
let lettersPicked = [];   //for selecting function
let chosenLetter; //the player guess
let space; //the space among the words in the sentence
let counter; //number of correct chosenLetter
let result; //the result of the game true win, false lose
let time;


let winSection = document.querySelector('.win-message')
let loseSection = document.querySelector('.lose-message')
console.log(loseSection)
//console.log(winMessage)

function startGame () {
        document.querySelector('.start-game-btn').addEventListener('click', function () {
        document.getElementById('notes').classList.add('hidden');
        //winSection.classList.add('hidden'); 
        document.querySelector('.game').classList.remove('hidden');

        if (document.querySelector('#easy').checked) {
            hiddenSolution = easyGame[Math.floor(Math.random()*easyGame.length)].split('')
            console.log(hiddenSolution)
            } else if (document.querySelector('#medium').checked){
            hiddenSolution = mediumGame[Math.floor(Math.random()*mediumGame.length)].split('')
            console.log(hiddenSolution)
            }else if (document.querySelector('#expert').checked) {
              hiddenSolution = expertGame[Math.floor(Math.random()*expertGame.length)].split('')
              console.log(hiddenSolution)
            }

        //hiddenSolution = easyGame[Math.floor(Math.random()*easyGame.length)].split('')
        lettersPicked = [];
        time = 40;
        counter = 0
        space = 0
        buttons()
        showResult()
        checkStatus ()
        countdownTimer ()
         
    })    
}

startGame ()

// create grid with letters
const buttons = function () {
    myButtons = document.querySelector('.letters-container');
    letters = document.createElement('ul');

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      listOfLetters = document.createElement('li');
      listOfLetters.id = 'letter';
      listOfLetters.innerText = alphabet[i];
      checkStatus();
      myButtons.appendChild(letters);
      letters.appendChild(listOfLetters);
    }
  }


  //function to render the sentence to guess
  showResult = function () {
    wordHolder = document.querySelector('.solutions');
    //console.log(wordHolder)
    correct = document.createElement('ul');
    
    for (let i = 0; i < hiddenSolution.length; i++) {
        correct.setAttribute('id', 'my-letter');
        chosenLetter = document.createElement('li');
        chosenLetter.setAttribute('class', 'guess');
        if (hiddenSolution[i] === " ") {
            chosenLetter.innerText = "**";
          space ++;
        } else {
            chosenLetter.innerText = "_";
        }
        
        lettersPicked.push(chosenLetter);
        //console.log(lettersPicked)
        wordHolder.appendChild(correct);
        correct.appendChild(chosenLetter);
      }
    }

    //click the letter and check if is in the hiddenSolution
    checkStatus = function () {
        listOfLetters.onclick = function () {
          let guess = (this.innerHTML);
          this.onclick = null;
          for (let i = 0; i < hiddenSolution.length; i++) {
            if (hiddenSolution[i] === guess) {
              lettersPicked[i].innerText = guess;
              counter ++;
              //console.log(counter)
              winGame ()
            } 
          }
        }
      }




function countdownTimer () {
    document.querySelector('.countdown').classList.remove('hidden');
    startCountdown(time)   
}


function startCountdown(time) {
    countdown = setInterval(function () {
        time--;
        let minutes = Math.floor(time / 60);
        if (minutes < 10 ) minutes = '0' + minutes;
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = '0' + seconds;
        document.querySelector('.countdown').innerHTML = 'Time remaining: ' + minutes + ':' + seconds;
        if (time === 0) {
            loseGame()
        }
    }, 1000)
}


function winGame () {
        if (counter + space === lettersPicked.length) {     
            result = true
           
           letters.parentNode.removeChild(letters);
            listOfLetters.parentNode.removeChild(listOfLetters);
             //correct.parentNode.removeChild(correct);
            //  chosenLetter.parentNode.removeChild(chosenLetter)
            clearInterval(countdown)
            document.querySelector('.countdown').classList.add('hidden');
            document.querySelector('.start-game-btn').classList.add('hidden');
            playAgain () 
        } 
}


function loseGame () {
    clearInterval(countdown)
    document.querySelector(".countdown").innerHTML = "TIME IS OVER";
    document.querySelector('.start-game-btn').classList.add('hidden');
    letters.parentNode.removeChild(letters);
    listOfLetters.parentNode.removeChild(listOfLetters);
    correct.parentNode.removeChild(correct);
    chosenLetter.parentNode.removeChild(chosenLetter)
    let loseMessage = document.createElement('p')
    loseMessage.innerText = 'You LOST!!! This is very sad! Give it another shot.';
    loseSection.appendChild(loseMessage);
    let losePicture = document.createElement('img')
    losePicture.setAttribute('src', './assets/sad_kitten.jpg')
    losePicture.setAttribute('id', 'lose-image')
    losePicture.setAttribute('alt', 'sad-kitten')
    loseSection.appendChild(losePicture);
    let retryButton = document.createElement('button')
        retryButton.setAttribute('class', 'new-game-btn')
        retryButton.innerText = 'Try Again' 
        loseSection.appendChild(retryButton);
   
         retryButton.onclick = function () {
        location.href = "./newgame.html";
    }

}

//console.log(document.getElementById('intro-img'))


let playAgain = function () {
    //document.getElementById('notes').classList.add('hidden'); NON MI SERVE?
    //document.querySelector('.game').classList.add('hidden');
     //winSection.classList.remove('hidden');
     let winMessage = document.createElement ('p')
     winMessage.innerText = 'YOU WON!!! Are you really an expert?!'
     winSection.appendChild(winMessage);
    let restartButton = document.createElement('button')
        restartButton.setAttribute('class', 'new-game-btn')
        restartButton.innerText = "Play Again"
        winSection.appendChild(restartButton);
   
         restartButton.onclick = function () {
        location.href = "./newgame.html";
    }
    
    // addEventListener('click', () => {
            //   time = 60;
            //   lettersPicked = []
            //    letters.parentNode.removeChild(letters);
            //    listOfLetters.parentNode.removeChild(listOfLetters);
            //    correct.parentNode.removeChild(correct);
            //    chosenLetter.parentNode.removeChild(chosenLetter)
            //    startGame ()
    // })
 }









       