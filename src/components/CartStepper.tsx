import type { MouseEvent, ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  product: any;
  /** The original "Add to cart" button, shown while the product isn't in the cart. */
  children: ReactNode;
  /** Background colour of the stepper (match the card's button). */
  color?: string;
  /** Text/icon colour on that background. */
  textColor?: string;
  className?: string;
}

/**
 * Once a product is in the cart, its "Add to cart" button turns into a − qty + stepper,
 * so shoppers can change the quantity from any product card. Removing the last unit
 * brings the original button back. Quantity stays in sync with the cart page.
 */
export default function CartStepper({ product, children, color = "#213B14", textColor = "#FFFFFF", className = "" }: Props) {
  const { items, addToCart, updateQuantity } = useCart();
  const id = product?.id || product?._id;
  const qty = items.find((i) => i.id === id)?.quantity ?? 0;

  if (!id || qty === 0) return <>{children}</>;

  const stop = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`inline-flex h-9 items-center justify-between overflow-hidden rounded-full shadow-sm ${className}`}
      style={{ backgroundColor: color, color: textColor }}
      onClick={stop}
      role="group"
      aria-label={`${product.name} quantity in cart`}
    >
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          updateQuantity(id, qty - 1);
        }}
        aria-label={qty === 1 ? `Remove ${product.name} from cart` : `Decrease ${product.name} quantity`}
        className="flex h-full w-9 items-center justify-center transition-colors hover:bg-black/15"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
      </button>
      <span className="min-w-[1.75rem] text-center text-sm font-extrabold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          addToCart(product);
        }}
        aria-label={`Increase ${product.name} quantity`}
        className="flex h-full w-9 items-center justify-center transition-colors hover:bg-black/15"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={3} />
      </button>
    </div>
  );
}
