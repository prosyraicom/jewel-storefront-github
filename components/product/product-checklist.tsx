import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ProductChecklistProps {
  features: string[];
}

export function ProductChecklist({ features }: ProductChecklistProps) {
  return (
    <div className="py-2 max-w-3xl text-black">
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li className="flex items-center" key={idx}>
            <CheckCircleIcon className="text-[#1d86b9] mr-2 h-5 w-5" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
