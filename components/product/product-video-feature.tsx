interface ProductVideoFeatureProps {
  title: string;
  description: string;
  videoSrc: string;
  videoPosition?: "left" | "right";
}

export default function ProductVideoFeature({
  title,
  description,
  videoSrc,
  videoPosition = "right",
}: ProductVideoFeatureProps) {
  const isVideoLeft = videoPosition === "left";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-8">
      {/* Video always first on mobile, left/right on desktop */}
      <div
        className={`w-full md:w-1/2 flex justify-center order-1 ${isVideoLeft ? "md:order-1" : "md:order-2"}`}
      >
        <video
          src={videoSrc}
          className="rounded-xl w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {/* Text always second on mobile, left/right on desktop */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center items-start order-2 ${isVideoLeft ? "md:order-2" : "md:order-1"}`}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 text-lg">{description}</p>
      </div>
    </div>
  );
}
