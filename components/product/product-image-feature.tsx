interface ProductImageFeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  imagePosition?: "left" | "right";
}

export default function ProductImageFeature({
  title,
  description,
  imageSrc,
  imagePosition = "right",
}: ProductImageFeatureProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-8">
      {/* Image always first on mobile, left/right on desktop */}
      <div
        className={`w-full md:w-1/2 flex justify-center order-1 ${isImageLeft ? "md:order-1" : "md:order-2"}`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="rounded-xl w-full object-cover"
        />
      </div>
      {/* Text always second on mobile, left/right on desktop */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center items-start order-2 ${isImageLeft ? "md:order-2" : "md:order-1"}`}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 text-lg">{description}</p>
      </div>
    </div>
  );
}
