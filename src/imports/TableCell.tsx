import svgPaths from "./svg-kcvizh7edf";

function TableContentsTextContents() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Asset
      </p>
    </div>
  );
}

function TitleSortingIcon() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents />
    </div>
  );
}

function Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_10866)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_10866">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon />
    </div>
  );
}

function TableContents() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon />
          <ButtonsIconButtonStandard />
        </div>
      </div>
    </div>
  );
}

export default function TableCell() {
  return (
    <div className="bg-neutral-100 content-stretch flex items-center relative size-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents />
    </div>
  );
}