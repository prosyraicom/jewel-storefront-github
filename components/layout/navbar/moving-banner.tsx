const images = [
  "https://jewelshoppingco.com/cdn/shop/files/cosmo_logo.webp?v=1723055368",
  "https://jewelshoppingco.com/cdn/shop/files/flat_600x600_075_f_1.png?v=1723056216", // star
  "https://jewelshoppingco.com/cdn/shop/files/VOGUE_LOGO.svg_copy.webp?v=1723055367",
  "https://jewelshoppingco.com/cdn/shop/files/flat_600x600_075_f_1.png?v=1723056216", // star
  "https://jewelshoppingco.com/cdn/shop/files/Pantene-logo_copy.webp?v=1723055367",
  "https://jewelshoppingco.com/cdn/shop/files/flat_600x600_075_f_1.png?v=1723056216", // star
  "https://jewelshoppingco.com/cdn/shop/files/Fox_Broadcasting_Company_logo__2019_.svg_copy.webp?v=1723055367",
  "https://jewelshoppingco.com/cdn/shop/files/flat_600x600_075_f_1.png?v=1723056216", // star
  "https://jewelshoppingco.com/cdn/shop/files/Loreal-logo_copy.webp?v=1723055367",
  "https://jewelshoppingco.com/cdn/shop/files/flat_600x600_075_f_1.png?v=1723056216", // star
];

export default function MovingBanner() {
  // Duplicate images for seamless looping
  const bannerImages = [...images, ...images];

  return (
    <div className="overflow-hidden bg-black py-3">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {bannerImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="Brand or Star"
            className={
              src.includes("flat_600x600_075_f_1.png")
                ? "h-6 mx-4 inline-block star-image"
                : "h-12 mx-8 inline-block"
            }
            style={{ objectFit: "contain" }}
            loading="lazy"
            role="presentation"
          />
        ))}
      </div>
    </div>
  );
}
