import svgPaths from "./svg-dbf2pc0lpk";

function Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_15156)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p29439e00} fill="var(--fill-0, #4F46E5)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_3_15156">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1ecb2b00} fill="var(--fill-0, #4F46E5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function ButtonsCommonButton() {
  return (
    <div className="bg-[#f2f1ff] relative rounded-[8px] size-full" data-name="Buttons / Common button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[12px] relative size-full">
          <Icon />
          <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-indigo-600 text-nowrap tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
            <p className="leading-[20px] whitespace-pre">Label</p>
          </div>
          <Icon1 />
        </div>
      </div>
    </div>
  );
}