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
    console.log("Player 2 is Playing");
  
    const currentDiceValue = rollDice();
  
    console.log(`Player 2: Current Dice Value; ${currentDiceValue}`);
    return currentDiceValue;
  };

  let player1Score = 0;
  let player1CurrentScore = 0;
  let consecutiveRolls = 0;

  const resetScores = () => {
    player1CurrentScore = 0;
    player1Score = 0;
};

const endTurn = () => {
    console.log(`Player 1's turn ends.`);
    return false;
};

const calculateCurrentScore = (currentDiceValue: number) => {
    player1CurrentScore += currentDiceValue;
    player1Score += currentDiceValue;
    console.log(`Player 1 current score: ${player1CurrentScore}`);
    console.log(`Player 1 total score: ${player1Score}`);
};

const skipTurn = () => {
    console.log(`Player 1's turn is skipped.`);
    return false;
};

const checkConsecutiveRolls = (currentDiceValue: number) => {
    if (currentDiceValue === consecutiveRolls) {
        console.log(`Player 1 rolled ${currentDiceValue} twice consecutively. Turn is skipped.`);
        consecutiveRolls = 0;
        return false;
    } else {
        consecutiveRolls = currentDiceValue;
        return true;
    }
};

const halveCurrentScore = () => {
    console.log(`Player 1 rolled 1. Current score is halved.`);
    player1CurrentScore = Math.floor(player1CurrentScore / 2);
    console.log(`Player 1 current score after halving: ${player1CurrentScore}`);
};

const doubleCurrentScore = () => {
    console.log(`Player 1 rolled 20. Current score is doubled.`);
    player1CurrentScore *= 2;
    console.log(`Player 1 current score after doubling: ${player1CurrentScore}`);
};
  
  const player1Roll_1 = () => {
    console.log("Player 1 in Play");
    const currentDiceValue = rollDice();
  
    console.log(`Player 1: Current Dice Value; ${currentDiceValue}`);

    // to stop play
    if (currentDiceValue === 15) {
        resetScores();
    } else if (currentDiceValue === 10 || currentDiceValue === 1 || currentDiceValue === 19) {
        return endTurn();
    } 

    // Calculate Player score (curr + prev)
    calculateCurrentScore(currentDiceValue);

    // Player skip turn when 6 & 12 is rolled
    if (currentDiceValue === 6 || currentDiceValue === 12) {
        return skipTurn();
    }

    // player rolls same number twice, skip a turn
    if (!checkConsecutiveRolls(currentDiceValue)) {
        return false;
    }

    // if Player roll 1
    if (currentDiceValue === 1) {
        halveCurrentScore();
    }

    // if player rolls 20, score is doubled
    if (currentDiceValue === 20) {
        doubleCurrentScore();
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
  

