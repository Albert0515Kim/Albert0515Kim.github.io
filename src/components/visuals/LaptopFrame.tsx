import Image from "next/image";

type LaptopFrameProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// Laptop shell around a desktop screen design. The screen is 16:10 and pinned to the top of the design.
export function LaptopFrame({ src, alt, className = "", priority, sizes = "(min-width: 1024px) 50vw, 100vw" }: LaptopFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="mx-auto w-[86%] rounded-t-[3%_4.8%] bg-[linear-gradient(180deg,#2a2c31,#0d0e10)] p-[1.8%] pb-[2.4%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.6%] bg-white">
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
        </div>
      </div>
      <div className="relative h-[0.9rem] rounded-b-[40%_100%] bg-[linear-gradient(180deg,#d4d7dc,#8c9098_70%,#5d6168)] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.6)] sm:h-[1.15rem]">
        <div className="absolute left-1/2 top-0 h-[40%] w-[14%] -translate-x-1/2 rounded-b-md bg-[#8e9299]" />
      </div>
    </div>
  );
}
