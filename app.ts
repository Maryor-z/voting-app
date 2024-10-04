function setValue(winningScore: number) {
    if (winningScore > 100) {
      console.log("score too high");
      return false;
    } else if (winningScore < 50) {
      console.log("score too low");
      return false;
    } else {
      console.log("Game started");
      return true;
    }
  }
  
  const rollDice = () => {
    const min = 1;
    const max = 20;
    const diceValue = Math.round(Math.random() * (max - min) + min);
  
    return diceValue;
  };
  
  const playerRoll_2 = () => {
    console.log("Player 2 in Play");
  
    const currentDiceValue = rollDice();
  
    console.log(`Player 2: Current Dice Value; ${currentDiceValue}`);
    return currentDiceValue;
  };

  let player1Score = 0;
  let player1CurrentScore = 0;
  let consecutiveRolls = 0;
  
  const player1Roll_1 = () => {
    console.log("Player 1 in Play");
    const currentDiceValue = rollDice();
  
    console.log(`Player 1: Current Dice Value; ${currentDiceValue}`);

    // to stop play
    if (currentDiceValue === 15) {
        console.log("Player 1 rolled 15, Score resets to 0, player should roll again.");
        player1CurrentScore = 0;
        player1Score = 0; //Reset score to 0
    } else if (currentDiceValue === 10 || currentDiceValue === 1 || currentDiceValue === 19) {
        console.log(`Player 1 rolled ${currentDiceValue}. Turn ends.`);
        return false;
    } else {
        player1CurrentScore += currentDiceValue; 
        player1Score += player1CurrentScore; //add the dice value to player score
        console.log(`Player 1 current score: ${player1CurrentScore}`)
        console.log(`Player 1 total score: ${player1Score}`);
    }

    // Player skip turn when 6 & 12 is rolled
    if (currentDiceValue === 6 || currentDiceValue === 12) {
        console.log(`Player 1 rolled ${currentDiceValue}. skips turn`);
        return false;
    }

    // player rolls same number twice, skip a turn
    if (currentDiceValue === consecutiveRolls) {
        console.log(`Player 1 rolled ${consecutiveRolls} twice, Turn is skiped`);
        consecutiveRolls = 0;
        return false;
    } else {
        consecutiveRolls = currentDiceValue;
    }

    // if Player roll 1
    if (currentDiceValue === 1) {
        console.log(`Player 1 rolled 1. Current score is halved.`);
        player1CurrentScore = Math.floor(player1CurrentScore / 2);
        console.log(`Player 1 current score after halving: ${player1CurrentScore}`);
    }
    return true;
  };

  let currentPlayer = 1;  
 
  const handleRotation = () => {
    let isPlaying = true;
    // let currentPlayer;

    if (currentPlayer === 1) {
        isPlaying = player1Roll_1();

        if (!isPlaying) {
            currentPlayer = 2;
        }
    } else if (currentPlayer === 2) {
        const currentDiceValue = playerRoll_2();
        console.log(`Player 2: Current Dice Value: ${currentDiceValue}`);
        currentPlayer = 1;
    }
    // const isPlayer1_playing = player1Roll_1();
    // const isPlayer2_playing = playerRoll_2();
  };


  
  const startGame = () => {
    const ifGameCanStart = setValue(60);
  
    //If Game can start, then start
    if (!ifGameCanStart) return null;
  
    //call function to handle players rotaations
    handleRotation();
  };
  
  startGame();
  

  //TODO
  //Player 1 should stop play until the follwing happens
  //1: diceValue= 15 || 10 || 1 || 19
  // diceValue=15? user currentScore === 0: user can continue
  
  //2: Find Player current score
  // current score = Current dice Value + prev;
  
  // when user rolls any of the below
  // 3: diceValue = 6 || 12
  // current should skip a turn
  
  // 4:when user rolls the same number 2x
  //cuurent should skip turn
  
  //5: when user rolls 1x
  // cuurent score is halved
  
  //6: when user roll 20
  // cuurent score * 2