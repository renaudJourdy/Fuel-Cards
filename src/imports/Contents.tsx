import svgPaths from "./svg-amy4arzyia";

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
        <g clipPath="url(#clip0_1_11026)" id="Icon/add_circle_outline/Content">
          <g id="Vector"></g>
          <path d={svgPaths.p34097c80} fill="var(--fill-0, #4F46E5)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_11026">
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1110 1">
          <g id="Dividers/Horizontal">
            <line id="line" stroke="var(--stroke-0, #E5E5E5)" x2="1110" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Header">
      <Contents />
      <DividersHorizontal />
    </div>
  );
}

function IconActionAddchart() {
  return (
    <div className="overflow-clip relative shrink-0 size-[103.654px]" data-name="Icon/Action/addchart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
        <g id="Group">
          <g id="Vector"></g>
          <path d={svgPaths.p7a078f2} fill="var(--fill-0, #E5E5E5)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Illustration() {
  return (
    <div className="bg-neutral-100 content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[144px]" data-name="Illustration">
      <IconActionAddchart />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center leading-[0] relative shrink-0 text-center tracking-[0.25px] w-full" data-name="Text">
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center min-w-full relative shrink-0 text-[#030812] text-[16px] w-[min-content]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[24px]">Create custom reports</p>
      </div>
      <div className="flex flex-col font-['Readex_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#6d7482] text-[14px] w-[400px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[20px]">Create tailored reports combining data from multiple data sources (assets, trips, fuel, eco-driving...).</p>
      </div>
    </div>
  );
}

function ButtonsCommonButton1() {
  return (
    <div className="bg-indigo-600 content-stretch flex gap-[10px] h-[48px] items-center justify-center p-[16px] relative rounded-[8px] shrink-0" data-name="Buttons / Common button">
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[20px] whitespace-pre">Create report</p>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full" data-name="Contents">
      <Illustration />
      <Text />
      <ButtonsCommonButton1 />
    </div>
  );
}

function PlaceholderContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px overflow-clip px-0 py-[48px] relative rounded-[12px] shrink-0 w-full" data-name="Placeholder container">
      <Contents1 />
    </div>
  );
}

function DividersHorizontal1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Dividers/Horizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1110 16">
        <g id="Dividers/Horizontal"></g>
      </svg>
    </div>
  );
}

export default function Contents2() {
  return (
    <div className="relative size-full" data-name="Contents">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start pb-[16px] pt-0 px-[16px] relative size-full">
          <Header />
          <PlaceholderContainer />
          <DividersHorizontal1 />
          <div className="absolute flex h-[723.294px] items-center justify-center left-[calc(50%+57.14px)] top-[161.62px] w-[1084.86px]" style={{ "--transform-inner-width": "1013.421875", "--transform-inner-height": "387.125" } as React.CSSProperties}>
            <div className="flex-none rotate-[200.907deg] scale-y-[-100%]">
              <div className="h-[387.134px] relative w-[1013.44px]">
                <div className="absolute inset-[-0.12%_-0.05%_-0.6%_-0.02%]" style={{ "--stroke-0": "rgba(13, 71, 161, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1015 390">
                    <path d={svgPaths.p3de6b770} fill="var(--stroke-0, #0D47A1)" id="Line 5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}