interface FAQItemProps {
  question: string;
  answer: string | string[];
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const renderAnswer = () => {
    if (Array.isArray(answer)) {
      return answer.map((paragraph, index) => (
        <p key={index} className="text-gray-600 mt-2 first:mt-0">
          {paragraph}
        </p>
      ));
    }
    return <p className="text-gray-600">{answer}</p>;
  };

  return (
    <div className="pb-6">
      <h2 className="text-xl font-semibold mb-3">{question}</h2>
      {renderAnswer()}
    </div>
  );
}
