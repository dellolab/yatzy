"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dice } from "@/components/dice";
import { ScoreCard } from "@/components/score-card";
import { PlayerInfo } from "@/components/player-info";
import { GameModeSelector } from "@/components/game-mode-selector";

export default function YahtzeeGame() {
  const [gameMode, setGameMode] = useState<"single" | "two" | null>(null);
  const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5]);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState([
    {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null,
    },
    {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null,
    },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("yahtzeeHighScore");
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore));
    }
  }, []);

  const rollDice = () => {
    if (rollsLeft > 0 && !isRolling) {
      setIsRolling(true);

      // Generate new values for dice that aren't held
      const newDiceValues = [...diceValues];
      for (let i = 0; i < 5; i++) {
        if (!heldDice[i]) {
          newDiceValues[i] = Math.floor(Math.random() * 6) + 1;
        }
      }

      setTimeout(() => {
        setDiceValues(newDiceValues);
        setIsRolling(false);
        setRollsLeft(rollsLeft - 1);
      }, 1000);
    }
  };

  const toggleHold = (index: number) => {
    if (rollsLeft < 3 && !isRolling) {
      const newHeldDice = [...heldDice];
      newHeldDice[index] = !newHeldDice[index];
      setHeldDice(newHeldDice);
    }
  };

  const endTurn = () => {
    setRollsLeft(3);
    setHeldDice([false, false, false, false, false]);

    // In single player mode, we don't change players
    if (gameMode === "two") {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  const updateScore = (category: string, value: number) => {
    const newScores = [...scores];
    newScores[currentPlayer] = {
      ...newScores[currentPlayer],
      [category]: value,
    };
    setScores(newScores);
    endTurn();
  };

  // Check if game is over
  useEffect(() => {
    const checkGameOver = () => {
      if (gameMode === "single") {
        const playerComplete = Object.values(scores[0]).every(
          (score) => score !== null
        );
        if (playerComplete) {
          setGameOver(true);

          // Update high score if current score is higher
          const totalScore = calculateTotalScore(0);
          if (totalScore > highScore) {
            setHighScore(totalScore);
            localStorage.setItem("yahtzeeHighScore", totalScore.toString());
          }
        }
      } else if (gameMode === "two") {
        const player1Complete = Object.values(scores[0]).every(
          (score) => score !== null
        );
        const player2Complete = Object.values(scores[1]).every(
          (score) => score !== null
        );

        if (player1Complete && player2Complete) {
          setGameOver(true);
        }
      }
    };

    checkGameOver();
  }, [scores, gameMode, highScore]);

  const calculateTotalScore = (playerIndex: number) => {
    const upperSectionTotal = [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
    ].reduce((sum, category) => sum + (scores[playerIndex][category] || 0), 0);

    const upperBonus = upperSectionTotal >= 63 ? 35 : 0;

    return (
      Object.values(scores[playerIndex]).reduce(
        (total, score) => total + (score || 0),
        0
      ) + upperBonus
    );
  };

  const resetGame = () => {
    setDiceValues([1, 2, 3, 4, 5]);
    setHeldDice([false, false, false, false, false]);
    setIsRolling(false);
    setRollsLeft(3);
    setCurrentPlayer(0);
    setScores([
      {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        chance: null,
      },
      {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        chance: null,
      },
    ]);
    setGameOver(false);
  };

  const startNewGame = () => {
    resetGame();
    setGameMode(null);
  };

  // If game mode is not selected, show the game mode selector
  if (gameMode === null) {
    return (
      <GameModeSelector onSelectMode={setGameMode} highScore={highScore} />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">YATZY</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <PlayerInfo
                  player1Score={calculateTotalScore(0)}
                  player2Score={calculateTotalScore(1)}
                  currentPlayer={currentPlayer}
                  gameMode={gameMode}
                  highScore={highScore}
                />
                <div>
                  <p className="text-lg font-medium mb-2">
                    Rolls left: {rollsLeft}
                  </p>
                  <Button
                    onClick={rollDice}
                    disabled={rollsLeft === 0 || isRolling || gameOver}
                    className="w-full"
                  >
                    {isRolling ? "Rolling..." : "Roll Dice"}
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                {diceValues.map((value, index) => (
                  <Dice
                    key={index}
                    value={value}
                    held={heldDice[index]}
                    rolling={isRolling && !heldDice[index]}
                    onClick={() => toggleHold(index)}
                    disabled={rollsLeft === 3 || isRolling || gameOver}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {gameOver && (
            <Card className="mb-8 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                {gameMode === "single" ? (
                  <>
                    <p className="text-xl mb-4">
                      Your score: {calculateTotalScore(0)} points
                    </p>
                    {calculateTotalScore(0) === highScore &&
                      calculateTotalScore(0) > 0 && (
                        <p className="text-lg text-green-600 dark:text-green-400 font-bold mb-4">
                          New High Score!
                        </p>
                      )}
                    <p className="mb-6">High Score: {highScore} points</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl mb-4">
                      {calculateTotalScore(0) > calculateTotalScore(1)
                        ? "Player 1 wins!"
                        : calculateTotalScore(0) < calculateTotalScore(1)
                        ? "Player 2 wins!"
                        : "It's a tie!"}
                    </p>
                    <p className="mb-6">
                      Player 1: {calculateTotalScore(0)} points | Player 2:{" "}
                      {calculateTotalScore(1)} points
                    </p>
                  </>
                )}
                <div className="flex gap-4 justify-center">
                  <Button onClick={resetGame}>Play Again</Button>
                  <Button onClick={startNewGame} variant="outline">
                    New Game
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <ScoreCard
            scores={scores[currentPlayer]}
            diceValues={diceValues}
            updateScore={updateScore}
            disabled={rollsLeft === 3 && !gameOver}
            gameOver={gameOver}
            playerName={
              gameMode === "single"
                ? "Your Score"
                : `Player ${currentPlayer + 1}`
            }
          />
        </div>
      </div>
    </div>
  );
}
