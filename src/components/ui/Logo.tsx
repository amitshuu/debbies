import Image from "next/image";

type LogoProps = {
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

const LOGO_SRC = "/images/logo-header.svg";

export function Logo({ width, height, className, priority }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Debbie's"
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{ height, width, objectFit: "contain" }}
    />
  );
}
