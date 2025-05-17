"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  scores: Record<string, number | null>;
  diceValues: number[];
  updateScore: (category: string, value: number) => void;
  disabled: boolean;
  gameOver: boolean;
  playerName: string;
}

export function ScoreCard({
  scores,
  diceValues,
  updateScore,
  disabled,
  gameOver,
  playerName,
}: ScoreCardProps) {
  // Calculate potential scores
  const calculatePotentialScore = (category: string) => {
    // Skip if already scored
    if (scores[category] !== null) return null;

    const counts = [0, 0, 0, 0, 0, 0];
    diceValues.forEach((value) => counts[value - 1]++);

    switch (category) {
      case "ones":
        return counts[0] * 1;
      case "twos":
        return counts[1] * 2;
      case "threes":
        return counts[2] * 3;
      case "fours":
        return counts[3] * 4;
      case "fives":
        return counts[4] * 5;
      case "sixes":
        return counts[5] * 6;
      case "threeOfAKind":
        return counts.some((count) => count >= 3)
          ? diceValues.reduce((sum, val) => sum + val, 0)
          : 0;
      case "fourOfAKind":
        return counts.some((count) => count >= 4)
          ? diceValues.reduce((sum, val) => sum + val, 0)
          : 0;
      case "fullHouse":
        return counts.some((count) => count === 3) &&
          counts.some((count) => count === 2)
          ? 25
          : 0;
      case "smallStraight": {
        const uniqueSorted = [...new Set(diceValues)].sort((a, b) => a - b);
        let hasSmallStraight = false;

        // Check for 1-2-3-4 or 2-3-4-5 or 3-4-5-6
        if (uniqueSorted.length >= 4) {
          for (let i = 0; i <= uniqueSorted.length - 4; i++) {
            if (uniqueSorted[i + 3] - uniqueSorted[i] === 3) {
              hasSmallStraight = true;
              break;
            }
          }
        }

        return hasSmallStraight ? 30 : 0;
      }
      case "largeStraight": {
        const uniqueSorted = [...new Set(diceValues)].sort((a, b) => a - b);
        return uniqueSorted.length === 5 &&
          uniqueSorted[4] - uniqueSorted[0] === 4
          ? 40
          : 0;
      }
      case "yatzy":
        return counts.some((count) => count === 5) ? 50 : 0;
      case "chance":
        return diceValues.reduce((sum, val) => sum + val, 0);
      default:
        return 0;
    }
  };

  const scoreCategories = [
    { id: "ones", label: "Ones" },
    { id: "twos", label: "Twos" },
    { id: "threes", label: "Threes" },
    { id: "fours", label: "Fours" },
    { id: "fives", label: "Fives" },
    { id: "sixes", label: "Sixes" },
    { id: "threeOfAKind", label: "Three of a Kind" },
    { id: "fourOfAKind", label: "Four of a Kind" },
    { id: "fullHouse", label: "Full House" },
    { id: "smallStraight", label: "Small Straight" },
    { id: "largeStraight", label: "Large Straight" },
    { id: "yahtzee", label: "Yahtzee" },
    { id: "chance", label: "Chance" },
  ];

  const upperSectionTotal = [
    "ones",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
  ].reduce((sum, category) => sum + (scores[category] || 0), 0);

  const upperBonus = upperSectionTotal >= 63 ? 35 : 0;

  const totalScore =
    Object.values(scores).reduce((sum, score) => sum + (score || 0), 0) +
    upperBonus;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{playerName} Scorecard</span>
          <span className="text-lg">Total: {totalScore}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="text-sm font-medium pb-2 border-b">Upper Section</div>
          {scoreCategories.slice(0, 6).map((category) => {
            const potentialScore = calculatePotentialScore(category.id);
            const isScored = scores[category.id] !== null;

            return (
              <div
                key={category.id}
                className="flex justify-between items-center py-1"
              >
                <span>{category.label}</span>
                {isScored ? (
                  <span className="font-medium">{scores[category.id]}</span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateScore(category.id, potentialScore || 0)
                    }
                    disabled={disabled || gameOver}
                    className={cn(
                      "min-w-16",
                      potentialScore && potentialScore > 0
                        ? "text-green-600 dark:text-green-400"
                        : ""
                    )}
                  >
                    {potentialScore !== null ? potentialScore : "-"}
                  </Button>
                )}
              </div>
            );
          })}

          <div className="flex justify-between items-center py-1 border-t border-b">
            <span className="font-medium">Upper Bonus (≥63)</span>
            <span
              className={cn(
                "font-medium",
                upperBonus > 0 ? "text-green-600 dark:text-green-400" : ""
              )}
            >
              {upperBonus}
            </span>
          </div>

          <div className="text-sm font-medium py-2 border-b">Lower Section</div>
          {scoreCategories.slice(6).map((category) => {
            const potentialScore = calculatePotentialScore(category.id);
            const isScored = scores[category.id] !== null;

            return (
              <div
                key={category.id}
                className="flex justify-between items-center py-1"
              >
                <span>{category.label}</span>
                {isScored ? (
                  <span className="font-medium">{scores[category.id]}</span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateScore(category.id, potentialScore || 0)
                    }
                    disabled={disabled || gameOver}
                    className={cn(
                      "min-w-16",
                      potentialScore && potentialScore > 0
                        ? "text-green-600 dark:text-green-400"
                        : ""
                    )}
                  >
                    {potentialScore !== null ? potentialScore : "-"}
                  </Button>
                )}
              </div>
            );
          })}

          <div className="flex justify-between items-center py-1 border-t pt-2">
            <span className="font-medium">TOTAL SCORE</span>
            <span className="font-bold text-lg">{totalScore}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
