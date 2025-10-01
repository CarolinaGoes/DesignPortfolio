// components/ui/toast.tsx
'use client'

import { toast } from 'sonner'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Componente de Toast simplificado
export const Toast = ({
  title,
  description,
  variant = 'default',
  action,
  ...props
}: {
  title: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg",
        variant === 'destructive' 
          ? "border-destructive bg-destructive text-destructive-foreground" 
          : "border bg-background text-foreground"
      )}
      {...props}
    >
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        {description && <div className="text-sm opacity-90 mt-1">{description}</div>}
      </div>
      
      {action && (
        <div className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary">
          {action}
        </div>
      )}
      
      <button
        className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
        onClick={() => {}}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Hook para usar toasts
export const useToast = () => {
  return {
    toast: (title: string, description?: string) => {
      toast.custom((t) => (
        <Toast
          title={title}
          description={description}
          onClose={() => toast.dismiss(t)}
        />
      ))
    },
    success: (title: string, description?: string) => {
      toast.success(title, { description })
    },
    error: (title: string, description?: string) => {
      toast.error(title, { description })
    },
    dismiss: toast.dismiss
  }
}

// Provider simplificado
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export type ToastActionElement = React.ReactElement<typeof ToastAction>

// Componente de ação opcional
export const ToastAction = ({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode 
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary"
      {...props}
    >
      {children}
    </button>
  )
}

// Export do Sonner para uso direto
export { Toaster } from 'sonner'
export { toast } from 'sonner'