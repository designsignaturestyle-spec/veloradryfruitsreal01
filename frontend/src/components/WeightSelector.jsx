import { WEIGHT_OPTIONS } from "@/data/products";

/**
 * Compact weight selector pill row.
 * Props: value (weight key), onChange (fn), size: "sm" | "md"
 */
export const WeightSelector = ({ value, onChange, size = "md", testIdPrefix = "weight" }) => {
  const padding = size === "sm" ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs";
  return (
    <div
      role="radiogroup"
      data-testid={`${testIdPrefix}-group`}
      className="inline-flex flex-wrap gap-1.5"
    >
      {WEIGHT_OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={active}
            data-testid={`${testIdPrefix}-${opt.key}`}
            data-active={active}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(opt.key);
            }}
            className={`rounded-full font-semibold uppercase tracking-wider transition border ${padding} ${
              active
                ? "bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] border-[var(--velora-forest)]"
                : "bg-white text-[var(--velora-forest)] border-[var(--velora-forest)]/15 hover:border-[var(--velora-gold)]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
