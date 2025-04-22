"use client";

interface FeatureItem {
  icon: string;
  title: string;
  subtitle?: string;
}

export function ProductFeatures() {
  const features: FeatureItem[] = [
    {
      icon: "undo",
      title: "Free 90-Day",
      subtitle: "Returns",
    },
    {
      icon: "favorite",
      title: "100% Money-Back",
      subtitle: "Guarantee",
    },
    {
      icon: "phone_in_talk",
      title: "24/7 Instant VIP",
      subtitle: "Support",
    },
  ];

  return (
    <div className="py-3 border-t border-gray-200">
      <ul className="flex justify-around max-w-md mx-auto">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex flex-col items-center text-center px-2"
          >
            <div className="flex justify-center items-center mb-1 text-green-500">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "40px" }}
              >
                {feature.icon}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-black">
                {feature.title}
              </span>
              {feature.subtitle && (
                <span className="font-semibold text-xs text-black">
                  {feature.subtitle}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
