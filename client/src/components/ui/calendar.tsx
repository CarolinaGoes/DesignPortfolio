import * as React from "react"
import { DayPicker } from "react-day-picker"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi" // ✅ Ícones alterados

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        // ...todas as outras classes...
      }}
      components={{
       
        IconLeft: ({ ...props }) => <FiArrowLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <FiArrowRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }