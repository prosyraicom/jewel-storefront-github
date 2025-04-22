"use client";

interface UrgencyTextProps {
  text: string;
}

export function UrgencyText({ text }: UrgencyTextProps) {
  return (
    <div className="flex justify-center mb-4">
      <div className="urgency-text text-center p-1 text-red-600 border-2 border-red-600 text-base">
        <strong>{text}</strong>
      </div>
    </div>
  );
}
