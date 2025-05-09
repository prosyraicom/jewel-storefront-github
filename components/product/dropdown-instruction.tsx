"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface Instruction {
  header: string;
  content: string;
}

interface DropdownInstructionProps {
  instructions: Instruction[];
}

// Simple parser for **bold**
function parseInstructionText(text: string) {
  const parts = [];
  let lastIndex = 0;
  let match;
  const boldRegex = /\*\*(.*?)\*\*/g;
  let key = 0;
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<b key={key++}>{match[1]}</b>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export function DropdownInstruction({
  instructions,
}: DropdownInstructionProps) {
  // Default to first open, but let Accordion manage state
  return (
    <Accordion type="single" collapsible defaultValue={"0"}>
      {instructions.map((instruction, idx) => (
        <AccordionItem value={String(idx)} key={idx}>
          <AccordionTrigger>{instruction.header}</AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-line text-gray-800 text-base">
              {parseInstructionText(instruction.content)}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
