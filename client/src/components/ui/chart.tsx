"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, RadialBar, RadialBarChart, Rectangle, Tooltip, XAxis, YAxis } from "recharts"
import type { LegendProps, TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement
    className?: string
  }
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("relative aspect-video", className)} {...props}>
    {children}
  </div>
))
ChartContainer.displayName = "ChartContainer"

const Chart = ChartContainer
const ChartLegend = Legend
const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps<ValueType, NameType> & {
    hideLabel?: boolean
    indicator?: "line" | "dot" | "dashed"
  }
>(
  (props, ref) => {
    // Usando 'as any' que confirmamos que funciona
    const { active, payload, label } = props as any;

    if (!active || !payload || !payload.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className="grid min-w-[8rem] items-stretch gap-1.5 rounded-md border bg-background p-2.5 text-sm shadow-xl"
      >
        {label && <div className="font-medium">{label}</div>}
        <div className="grid gap-1.5">
          {payload.map((item: any, index: number) => (
            <div
              key={item.dataKey || index}
              className="flex flex-wrap items-center justify-between gap-1.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
                {String(item.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartLegendContentProps extends React.ComponentProps<"div"> {
  payload?: any[];
  verticalAlign?: 'top' | 'middle' | 'bottom'; 
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  ({ className, payload, verticalAlign = "bottom", ...props }, ref) => {
    if (!payload || !payload.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
        {...props}
      >
        {payload.map((item: any) => (
          <div
            key={item.value as string}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
            {item.value}
          </div>
        ))}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

export {
  Chart,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
}