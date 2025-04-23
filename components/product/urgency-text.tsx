"use client";

interface UrgencyTextProps {
  text: string;
}

export function UrgencyText({ text }: UrgencyTextProps) {
  return (
    <div className="flex justify-center mb-4">
      <div className="urgency-text text-center py-1 px-2 text-red-600 border-2 border-red-600 font-normal">
        <strong>{text}</strong>
      </div>
    </div>
  );
}
