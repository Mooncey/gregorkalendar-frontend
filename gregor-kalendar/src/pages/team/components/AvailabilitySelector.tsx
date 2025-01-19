import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../lib/utils"

interface AvailabilitySelectorProps {
  onSelect?: (status: 'available' | 'prefer-not') => void
  className?: string
}

export default function AvailabilitySelector({ onSelect, className }: AvailabilitySelectorProps) {
  return (
    <Card className={cn(
      "absolute z-10 w-32 p-2 space-y-1 shadow-lg bg-white",
      className
    )}>
      <Button
        variant="ghost"
        className="w-full justify-start font-normal text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
        onClick={() => onSelect?.('available')}
      >
        Available
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={() => onSelect?.('prefer-not')}
      >
        Prefer Not
      </Button>
    </Card>
  )
}

