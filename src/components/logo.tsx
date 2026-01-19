interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`logo-wrapper ${className}`}>
      <img
        src="/logo.svg"
        alt="Flavor Blog Logo - Modern Editorial Branding"
        className="logo-img"
        style={{ height: "1.5rem", width: "auto" }}
      />
    </div>
  );
}
