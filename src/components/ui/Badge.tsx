import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-3 rounded-xl border border-[rgba(97,194,73,0.3)] bg-[rgba(186,231,123,0.2)] px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-ochre" />
      <span className="font-display text-xs font-black uppercase tracking-[2.4px] text-ochre">
        {children}
      </span>
    </span>
  );
}
