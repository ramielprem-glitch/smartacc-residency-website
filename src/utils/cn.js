// Tailwind class helpers — small, composable, no duplicate strings.
import { clsx } from 'clsx'

export function cn(...args) {
  return clsx(...args)
}
