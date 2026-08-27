import LogoImg from "../../assets/Logo.png";

interface LogoProps {
  size?: number;
  className?: string;
  rounded?: "lg" | "xl" | "2xl";
}

const radiusMap = {
  lg: 8,
  xl: 12,
  "2xl": 16,
};

export default function Logo({ size = 34, className = "", rounded = "lg" }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size, borderRadius: radiusMap[rounded], overflow: "hidden" }}
    >
      <img src={LogoImg} alt="NoteFlow Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}
