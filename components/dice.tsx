"use client"

import { cn } from "@/lib/utils"

interface DiceProps {
  value: number
  held: boolean
  rolling: boolean
  onClick: () => void
  disabled: boolean
}

export function Dice({ value, held, rolling, onClick, disabled }: DiceProps) {
  return (
    <div
      className={cn(
        "w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center cursor-pointer select-none shadow-md relative",
        held ? "bg-green-100 dark:bg-green-900" : "bg-white dark:bg-gray-800",
        rolling ? "animate-dice-roll" : "",
        disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-lg transition-shadow",
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className={cn("transition-all duration-300 w-full h-full", rolling ? "opacity-0" : "opacity-100")}>
        {value === 1 && (
          <div className="grid grid-cols-1 grid-rows-1 w-full h-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        )}
        {value === 2 && (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        )}
        {value === 3 && (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        )}
        {value === 4 && (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        )}
        {value === 5 && (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        )}
        {value === 6 && (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>
      {held && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          ✓
        </div>
      )}
    </div>
  )
}
