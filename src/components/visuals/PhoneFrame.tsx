import Image from "next/image";

type PhoneFrameProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// Titanium-edged iPhone frame around a real App Store screenshot.
export function PhoneFrame({ src, alt, className = "", priority, sizes = "(min-width: 1024px) 18vw, 45vw" }: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[1179/2556] rounded-[14%/6.5%] bg-[linear-gradient(145deg,#5b5f67,#1b1d21_35%,#2c2f35_65%,#8b9099)] p-[2.6%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12.4%/5.7%] bg-black">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
