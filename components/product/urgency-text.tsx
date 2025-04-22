"use client";

interface UrgencyTextProps {
  text: string;
}

export function UrgencyText({ text }: UrgencyTextProps) {
  return (
    <div className="flex justify-center mb-4">
      <div className="urgency-text text-center py-1 px-4 text-red-600 border border-red-600 text-sm font-medium">
        <strong>{text}</strong>
      </div>
    </div>
  );
}
