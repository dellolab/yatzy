"use client"

import { cn } from "@/lib/utils"

interface PlayerInfoProps {
  player1Score: number
  player2Score: number
  currentPlayer: number
  gameMode: "single" | "two"
  highScore: number
}

export function PlayerInfo({ player1Score, player2Score, currentPlayer, gameMode, highScore }: PlayerInfoProps) {
  if (gameMode === "single") {
    return (
      <div className="flex gap-4">
        <div className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-500 shadow-md">
          <div className="font-bold">Your Score</div>
          <div className="text-lg">{player1Score} points</div>
        </div>
        <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="font-bold">High Score</div>
          <div className="text-lg">{highScore} points</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <div
        className={cn(
          "px-4 py-2 rounded-lg transition-all",
          currentPlayer === 0
            ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500 shadow-md"
            : "bg-gray-100 dark:bg-gray-800",
        )}
      >
        <div className="font-bold">Player 1</div>
        <div className="text-lg">{player1Score} points</div>
      </div>

      <div
        className={cn(
          "px-4 py-2 rounded-lg transition-all",
          currentPlayer === 1
            ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500 shadow-md"
            : "bg-gray-100 dark:bg-gray-800",
        )}
      >
        <div className="font-bold">Player 2</div>
        <div className="text-lg">{player2Score} points</div>
      </div>
    </div>
  )
}
