import svgPaths from "./svg-lyq02hlac2";

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Readex_Pro:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#030812] text-[20px] text-nowrap tracking-[0.5px] whitespace-pre" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Custom reports
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-end relative shrink-0">
      <Frame1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_6700)" id="Icon/add_circle_outline/Content">
          <g id="Vector"></g>
          <path d={svgPaths.pe97a000} fill="var(--fill-0, #4F46E5)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6700">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsCommonButton() {
  return (
    <div className="h-[18px] relative rounded-[8px] shrink-0" data-name="Buttons / Common button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-center justify-center p-[12px] relative">
          <Icon />
          <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-indigo-600 text-nowrap tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
            <p className="leading-[20px] whitespace-pre">Create new report</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex items-end justify-between overflow-clip pb-[4px] pt-[16px] px-0 relative shrink-0 w-full" data-name="Contents">
      <Frame />
      <ButtonsCommonButton />
    </div>
  );
}

function DividersHorizontal() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Dividers/Horizontal">
      <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1094 1">
          <g id="Dividers/Horizontal">
            <line id="line" stroke="var(--stroke-0, #E5E5E5)" x2="1094" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative size-full" data-name="Header">
      <Contents />
      <DividersHorizontal />
    </div>
  );
}