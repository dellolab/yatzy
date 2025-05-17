"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

interface GameModeSelectorProps {
  onSelectMode: (mode: "single" | "two") => void;
  highScore: number;
}

export function GameModeSelector({
  onSelectMode,
  highScore,
}: GameModeSelectorProps) {
  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-4">YATZY</h1>
      <p className="text-xl text-center mb-12 text-muted-foreground">
        Select game mode
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectMode("single")}
        >
          <CardHeader className="text-center">
            <CardTitle className="flex justify-center mb-2">
              <User className="h-12 w-12 text-primary" />
            </CardTitle>
            <CardTitle>Single Player</CardTitle>
            <CardDescription>
              Play solo and try to beat your high score
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Current High Score: {highScore} points</p>
            <Button onClick={() => onSelectMode("single")} className="w-full">
              Start Solo Game
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectMode("two")}
        >
          <CardHeader className="text-center">
            <CardTitle className="flex justify-center mb-2">
              <Users className="h-12 w-12 text-primary" />
            </CardTitle>
            <CardTitle>Two Players</CardTitle>
            <CardDescription>
              Play against a friend on the same device
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Take turns and compete for the highest score</p>
            <Button onClick={() => onSelectMode("two")} className="w-full">
              Start 2-Player Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
