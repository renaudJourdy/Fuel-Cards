import svgPaths from "./svg-0xt1crfpjr";

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

function ButtonsCommonButton() {
  return (
    <div className="bg-indigo-600 content-stretch flex gap-[10px] h-[48px] items-center justify-center p-[16px] relative rounded-[8px] shrink-0" data-name="Buttons / Common button">
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[20px] whitespace-pre">Create report</p>
      </div>
    </div>
  );
}

export default function Contents() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative size-full" data-name="Contents">
      <Illustration />
      <Text />
      <ButtonsCommonButton />
    </div>
  );
}