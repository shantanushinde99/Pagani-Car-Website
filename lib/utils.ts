import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getPhaseProgress(progress: number, start: number, end: number) {
  if (progress < start) return 0;
  if (progress > end) return 1;
  return (progress - start) / (end - start);
}
