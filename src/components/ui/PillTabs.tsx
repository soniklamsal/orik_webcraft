type PillTabsProps = {
  labels: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  idPrefix: string;
  panelId: string;
  label: string;
};

export function PillTabs({ labels, activeIndex, onSelect, idPrefix, panelId, label }: PillTabsProps) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {labels.map((tab, index) => {
        const selected = index === activeIndex;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${idPrefix}-${index}`}
            aria-selected={selected}
            aria-controls={panelId}
            onClick={() => onSelect(index)}
            className={`h-10 shrink-0 cursor-pointer rounded-[24px] border border-tab-border px-3.5 py-2.5 text-left text-[13px] leading-5 whitespace-nowrap text-navy md:h-12 md:pt-3 md:pr-7.5 md:pb-3.5 md:pl-4.25 md:text-[14px] ${
              selected ? "bg-tab-active" : "bg-white"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
