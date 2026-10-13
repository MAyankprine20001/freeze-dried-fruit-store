import { hasPack3 } from "../utils/packOf3";

interface Props {
  product: any;
  pack3: boolean;
  onChange: (pack3: boolean) => void;
  /** Accent colour of the page (selected pill). */
  color?: string;
  className?: string;
}

/** "1 Pack | Pack of 3" switch for a product card. Renders nothing if the admin set no Pack of 3 price. */
export default function PackChooser({ product, pack3, onChange, color = "#213B14", className = "" }: Props) {
  if (!hasPack3(product)) return null;
  const opt = (on: boolean, label: string, price: number) => {
    const active = pack3 === on;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(on);
        }}
        aria-pressed={active}
        className={`flex-1 rounded-full px-2 py-1.5 text-[11px] font-bold leading-tight transition-colors ${
          active ? "text-white shadow-sm" : "text-[#213B14]/70 hover:text-[#213B14]"
        }`}
        style={active ? { backgroundColor: color } : undefined}
      >
        {label} · ₹{price}
      </button>
    );
  };
  return (
    <div
      className={`flex gap-1 rounded-full border border-[#213B14]/15 bg-[#FAF7F2] p-1 ${className}`}
      role="group"
      aria-label="Choose pack size"
    >
      {opt(false, "1 Pack", Number(product.price))}
      {opt(true, "Pack of 3", Number(product.pack3Price))}
    </div>
  );
}
