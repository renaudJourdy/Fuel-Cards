import svgPaths from "./svg-9qh9cqqme2";

function Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6668)" id="Icon/Action/search">
          <g id="Vector"></g>
          <path d={svgPaths.p730dd00} fill="var(--fill-0, #4F46E5)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6668">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-center justify-center relative rounded-[999px] shrink-0" data-name="Buttons / Icon Button / Standard">
      <Icon />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative size-full">
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#030812] text-[16px] text-nowrap tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[24px] whitespace-pre">484 assets</p>
      </div>
      <ButtonsIconButtonStandard />
    </div>
  );
}