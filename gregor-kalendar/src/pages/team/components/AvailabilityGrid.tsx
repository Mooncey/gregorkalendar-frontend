import { useState, useRef } from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { addBlocksToArray, dayStrings, relativeTimeToAbsolute, removeBlocksFromArray } from "../../../utils/block"
import { Block, MemberAvailability } from "../../../types/types"
import { AvailabilityParams } from "./AvailabilityTab"

interface TimeSlot {
  day: number
  hour: number
  quarter: number
}

export function AvailabilityGrid(params: AvailabilityParams) {

  const { availableBlocks, preferNotBlocks, handleUpdate } = params

  const [draftAvailableBlocks, setDraftAvailableBlocks] = useState<Block[]>(availableBlocks)
  const [draftPreferNotBlocks, setDraftPreferNotBlocks] = useState<Block[]>(preferNotBlocks)

  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set())
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<TimeSlot | null>(null)
  const lastHovered = useRef<TimeSlot | null>(null)

  const [isCardVisible, setIsCardVisible] = useState(false)
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number } | null>(null)

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const quarters = [0, 15, 30, 45]
  const days = [0, 1, 2, 3, 4, 5, 6]

  const getSlotKey = (day: number, hour: number, quarter: number) =>
    `${day}-${hour}-${quarter}`

  const handleMouseDown = (day: number, hour: number, quarter: number) => {
    console.log("Day: " + day.toString())
    console.log("Hour: " + hour.toString())
    console.log("Quarter: " + quarter.toString())
    setIsSelecting(true)
    setSelectionStart({ day, hour, quarter })
    lastHovered.current = { day, hour, quarter }

    const slotKey = getSlotKey(day, hour, quarter)
    const newSelection = new Set(selectedSlots)

    if (selectedSlots.has(slotKey)) {
      newSelection.delete(slotKey)
    } else {
      newSelection.add(slotKey)
    }

    setSelectedSlots(newSelection)
  }

  const handleMouseEnter = (day: number, hour: number, quarter: number) => {
    if (!isSelecting || !selectionStart) return

    const current = { day, hour, quarter }
    lastHovered.current = current

    // Convert time to minutes for easier comparison
    const getMinutes = (slot: TimeSlot) => (slot.hour * 60) + (slot.quarter)
    const startMinutes = getMinutes(selectionStart)
    const currentMinutes = getMinutes(current)

    // Calculate the range
    const startDay = Math.min(selectionStart.day, current.day)
    const endDay = Math.max(selectionStart.day, current.day)
    const startTime = Math.min(startMinutes, currentMinutes)
    const endTime = Math.max(startMinutes, currentMinutes)

    const newSelection = new Set<string>()

    // Add all slots in the range
    for (let d = startDay; d <= endDay; d++) {
      for (let m = startTime; m <= endTime; m += 15) {
        const hour = Math.floor(m / 60)
        const quarter = m % 60
        newSelection.add(getSlotKey(d, hour, quarter))
      }
    }

    setSelectedSlots(newSelection)
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
    setSelectionStart(null)

    if (lastHovered.current) {
      const slotElement = document.querySelector(
        `[data-slot-key="${getSlotKey(lastHovered.current.day, lastHovered.current.hour, lastHovered.current.quarter)}"]`
      )

      if (slotElement) {
        const rect = slotElement.getBoundingClientRect()
        setCardPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX })
        setIsCardVisible(true)
      }
    }
  }


  const handleSaveAvailability = () => {
    // Here you would typically send this to your API
    const updateParams: MemberAvailability = {
      availableBlocks: draftAvailableBlocks,
      preferNotBlocks: draftPreferNotBlocks,
      userEmail: "someone_1@example.com"
    }
    handleUpdate(updateParams)
  }

  const handleSelectOption = (option: string) => {
    // Handle the selection logic for the card
    console.log("Selected:", option)
    setIsCardVisible(false)

    const blocksMarked: Block[] = [];

    selectedSlots.forEach((timeString) => {
      const [day, hour, quarter] = timeString.split('-').map(Number);
      if (!isNaN(day) && !isNaN(hour) && !isNaN(quarter)) {
        blocksMarked.push(relativeTimeToAbsolute(day, hour, quarter));
      } else {
        console.warn(`Invalid time string: ${timeString}`);
      }
    });

    if (option == "available") {
      handleMarkAvailable(blocksMarked)
    } else if (option == "unavailable") {
      handleMarkUnavailable(blocksMarked)
    } else if (option == "prefer-not") {
      handleMarkPreferNot(blocksMarked)
    }

    setSelectedSlots(new Set())
  }

  const handleMarkAvailable = (blocksToAdd: Block[]) => {
    const newAvail = addBlocksToArray(draftAvailableBlocks, blocksToAdd)
    setDraftAvailableBlocks(newAvail)

    const newPreferNot = removeBlocksFromArray(draftPreferNotBlocks, blocksToAdd)
    setDraftPreferNotBlocks(newPreferNot)
  }

  const handleMarkUnavailable = (blocksToRemove: Block[]) => {
    const newAvail = removeBlocksFromArray(draftAvailableBlocks, blocksToRemove)
    setDraftAvailableBlocks(newAvail)

    const newPreferNot = removeBlocksFromArray(draftPreferNotBlocks, blocksToRemove)
    setDraftPreferNotBlocks(newPreferNot)
  }

  const handleMarkPreferNot = (blocksToPreferNot: Block[]) => {
    const newPreferNot = addBlocksToArray(draftPreferNotBlocks, blocksToPreferNot)
    setDraftPreferNotBlocks(newPreferNot)

    const newAvail = removeBlocksFromArray(draftAvailableBlocks, blocksToPreferNot)
    setDraftAvailableBlocks(newAvail)
  }


  const blockFromSlotKey = (slotKey: string): Block | null => {
    const [day, hour, quarter] = slotKey.split('-').map(Number)
    if (day === undefined || hour === undefined || quarter === undefined) return null
    return day * 96 + hour * 4 + quarter / 15 as Block
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleSaveAvailability}>Save Availability</Button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header row with days */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)]">
            <div className="p-2" />
            {days.map(day => (
              <div key={day} className="p-2 text-center font-medium border-b">
                <div className="text-sm text-muted-foreground">
                  {dayStrings[day]}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots grid */}
          <div
            className="grid grid-cols-[100px_repeat(7,1fr)]"
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            {hours.map(hour => (
              <div key={`hour-${hour}`} className="contents">
                <div className="row-span-4 p-2 text-sm text-muted-foreground border-r flex items-center">
                  {`${hour.toString().padStart(2, "0")}:00`}
                </div>
                {quarters.map(quarter => (
                  <div key={`${hour}-${quarter}`} className="contents">
                    {days.map(day => {
                      const slotKey = getSlotKey(day, hour, quarter)
                      const block = blockFromSlotKey(slotKey)

                      const isAvailable = block !== null && draftAvailableBlocks.includes(block)
                      const isPreferNot = block !== null && draftPreferNotBlocks.includes(block)

                      return (
                        <div
                          key={`${day}-${hour}-${quarter}`}
                          data-slot-key={getSlotKey(day, hour, quarter)}
                          className={cn(
                            "border-r border-t h-4 transition-colors",
                            "cursor-pointer hover:bg-muted/50",
                            isAvailable && "bg-green-300", // Green for available
                            isPreferNot && "bg-orange-300", // Orange for prefer-not
                            selectedSlots.has(getSlotKey(day, hour, quarter)) && "bg-primary/20",
                            quarter === 0 && "border-t-muted-foreground"
                          )}
                          onMouseDown={() => handleMouseDown(day, hour, quarter)}
                          onMouseEnter={() => handleMouseEnter(day, hour, quarter)}
                        />)
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCardVisible && cardPosition && (
        <div
          className="absolute z-10 w-32 p-2 space-y-1 shadow-lg bg-white border"
          style={{ top: cardPosition.top, left: cardPosition.left }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start font-normal text-green-500 hover:text-green-600 hover:bg-green-50"
            onClick={() => handleSelectOption('available')}
          >
            Available
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start font-normal text-orange-500 hover:text-orange-600 hover:bg-orange-50"
            onClick={() => handleSelectOption('prefer-not')}
          >
            Prefer Not
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start font-normal text-black-500 hover:text-black-600 hover:bg-white-50"
            onClick={() => handleSelectOption('unavailable')}
          >
            Unavailable
          </Button>
        </div>
      )}
    </div>
  )
}