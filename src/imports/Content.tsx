import svgPaths from "./svg-1p2yl7uxh1";

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

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#030812] text-[16px] text-nowrap tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[24px] whitespace-pre">484 assets</p>
      </div>
      <ButtonsIconButtonStandard />
    </div>
  );
}

function Icon1() {
  return (
    <button className="block overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p23a74a00} fill="var(--fill-0, #4F46E5)" id="Vector" />
        </g>
      </svg>
    </button>
  );
}

function ButtonsCommonButton() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[8px] h-[30px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Buttons / Common button">
      <button className="[white-space-collapse:collapse] flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-indigo-600 text-nowrap tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[20px] whitespace-pre">Customize</p>
      </button>
      <Icon1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame1 />
      <ButtonsCommonButton />
    </div>
  );
}

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

function Icon2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon2 />
    </div>
  );
}

function TableContents() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon />
          <ButtonsIconButtonStandard1 />
        </div>
      </div>
    </div>
  );
}

function TableCell() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents />
    </div>
  );
}

function TableContentsTextContents1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        AA 803 FR 01
      </p>
    </div>
  );
}

function TableContents1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents1 />
        </div>
      </div>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents1 />
    </div>
  );
}

function TableContentsTextContents2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        3618WWCI01
      </p>
    </div>
  );
}

function TableContents2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents2 />
        </div>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents2 />
    </div>
  );
}

function TableContentsTextContents3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        AA-821-FR
      </p>
    </div>
  );
}

function TableContents3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents3 />
        </div>
      </div>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents3 />
    </div>
  );
}

function TableContentsTextContents4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-[124px]" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        AA 848 FR
      </p>
    </div>
  );
}

function TableContents4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents4 />
        </div>
      </div>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents4 />
    </div>
  );
}

function TableContentsTextContents5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        1396THCW16
      </p>
    </div>
  );
}

function TableContents5() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents5 />
        </div>
      </div>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents5 />
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px] z-[13]" data-name="Column">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
    </div>
  );
}

function TableContents6() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents">
      <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[48px]" data-name="Line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(219, 222, 228, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 1">
                <line id="Line" stroke="var(--stroke-0, #DBDEE4)" strokeDasharray="4 4" x2="48" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-px" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents6 />
    </div>
  );
}

function TableContents7() {
  return (
    <div className="h-full min-w-px relative shrink-0 w-px" data-name="Table / Contents">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 64">
        <g clipPath="url(#clip0_1_6628)" id="Table / Contents">
          <line id="Line" stroke="var(--stroke-0, #DBDEE4)" strokeDasharray="4 4" x1="0.500003" x2="0.5" y1="2.18557e-08" y2="64" />
        </g>
        <defs>
          <clipPath id="clip0_1_6628">
            <rect fill="white" height="64" width="1" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents7 />
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[12]" data-name="Column">
      <TableCell6 />
      {[...Array(13).keys()].map((_, i) => (
        <TableCell7 key={i} />
      ))}
    </div>
  );
}

function TableContentsTextContents6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Make
      </p>
    </div>
  );
}

function TitleSortingIcon1() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents6 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon3 />
    </div>
  );
}

function TableContents8() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon1 />
          <ButtonsIconButtonStandard2 />
        </div>
      </div>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents8 />
    </div>
  );
}

function TableContentsTextContents7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Suzuki
      </p>
    </div>
  );
}

function TableContents9() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents7 />
        </div>
      </div>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents9 />
    </div>
  );
}

function TableContentsTextContents8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-900 text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Renault
      </p>
    </div>
  );
}

function TableContents10() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents8 />
        </div>
      </div>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents10 />
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px] z-[11]" data-name="Column">
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell9 />
      <TableCell9 />
      <TableCell9 />
      <TableCell9 />
      <TableCell10 />
      <TableCell9 />
      <TableCell9 />
      <TableCell9 />
      <TableCell9 />
      <TableCell10 />
      <TableCell9 />
    </div>
  );
}

function TableContentsTextContents9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Model
      </p>
    </div>
  );
}

function TitleSortingIcon2() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents9 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon4 />
    </div>
  );
}

function TableContents11() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon2 />
          <ButtonsIconButtonStandard3 />
        </div>
      </div>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents11 />
    </div>
  );
}

function TableContentsTextContents10() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Fronx
      </p>
    </div>
  );
}

function TableContents12() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents10 />
        </div>
      </div>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents12 />
    </div>
  );
}

function TableContentsTextContents11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-900 text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Dzire
      </p>
    </div>
  );
}

function TableContents13() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents11 />
        </div>
      </div>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents13 />
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px] z-10" data-name="Column">
      <TableCell11 />
      <TableCell12 />
      <TableCell12 />
      <TableCell12 />
      <TableCell12 />
      <TableCell13 />
      <TableCell12 />
      <TableCell12 />
      <TableCell12 />
      <TableCell12 />
      <TableCell13 />
      <TableCell12 />
      <TableCell12 />
      <TableCell12 />
    </div>
  );
}

function TableContentsTextContents12() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Trips
      </p>
    </div>
  );
}

function TitleSortingIcon3() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents12 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon5 />
    </div>
  );
}

function TableContents14() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon3 />
          <ButtonsIconButtonStandard4 />
        </div>
      </div>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents14 />
    </div>
  );
}

function TableContentsTextContents13() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        60
      </p>
    </div>
  );
}

function TableContents15() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents13 />
        </div>
      </div>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents15 />
    </div>
  );
}

function TableContentsTextContents14() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        442
      </p>
    </div>
  );
}

function TableContents16() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents14 />
        </div>
      </div>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents16 />
    </div>
  );
}

function TableContentsTextContents15() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        128
      </p>
    </div>
  );
}

function TableContents17() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents15 />
        </div>
      </div>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents17 />
    </div>
  );
}

function TableContentsTextContents16() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        295
      </p>
    </div>
  );
}

function TableContents18() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents16 />
        </div>
      </div>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents18 />
    </div>
  );
}

function TableContentsTextContents17() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        196
      </p>
    </div>
  );
}

function TableContents19() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents17 />
        </div>
      </div>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents19 />
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px] z-[9]" data-name="Column">
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
    </div>
  );
}

function TableContentsTextContents18() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Distance
      </p>
    </div>
  );
}

function TitleSortingIcon4() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents18 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon6 />
    </div>
  );
}

function TableContents20() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon4 />
          <ButtonsIconButtonStandard5 />
        </div>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents20 />
    </div>
  );
}

function TableContentsTextContents19() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        160 km
      </p>
    </div>
  );
}

function TableContents21() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents19 />
        </div>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents21 />
    </div>
  );
}

function TableContentsTextContents20() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        625 km
      </p>
    </div>
  );
}

function TableContents22() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents20 />
        </div>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents22 />
    </div>
  );
}

function TableContentsTextContents21() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        859 km
      </p>
    </div>
  );
}

function TableContents23() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents21 />
        </div>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents23 />
    </div>
  );
}

function TableContentsTextContents22() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        558 km
      </p>
    </div>
  );
}

function TableContents24() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents22 />
        </div>
      </div>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents24 />
    </div>
  );
}

function TableContentsTextContents23() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        724 km
      </p>
    </div>
  );
}

function TableContents25() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents23 />
        </div>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents25 />
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px] z-[8]" data-name="Column">
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function TableContentsTextContents24() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Drive time
      </p>
    </div>
  );
}

function TitleSortingIcon5() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents24 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon7 />
    </div>
  );
}

function TableContents26() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon5 />
          <ButtonsIconButtonStandard6 />
        </div>
      </div>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents26 />
    </div>
  );
}

function TableContentsTextContents25() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        7h 39m
      </p>
    </div>
  );
}

function TableContents27() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents25 />
        </div>
      </div>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents27 />
    </div>
  );
}

function TableContentsTextContents26() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        39h 57m
      </p>
    </div>
  );
}

function TableContents28() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents26 />
        </div>
      </div>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents28 />
    </div>
  );
}

function TableContentsTextContents27() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        4h 15m
      </p>
    </div>
  );
}

function TableContents29() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents27 />
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents29 />
    </div>
  );
}

function TableContentsTextContents28() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        13h 1m
      </p>
    </div>
  );
}

function TableContents30() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents28 />
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents30 />
    </div>
  );
}

function TableContentsTextContents29() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        16h 39m
      </p>
    </div>
  );
}

function TableContents31() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents29 />
        </div>
      </div>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents31 />
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[110px] z-[7]" data-name="Column">
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function TableContentsTextContents30() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Stop time
      </p>
    </div>
  );
}

function TitleSortingIcon6() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents30 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon8 />
    </div>
  );
}

function TableContents32() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon6 />
          <ButtonsIconButtonStandard7 />
        </div>
      </div>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents32 />
    </div>
  );
}

function TableContentsTextContents31() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        136h 14m
      </p>
    </div>
  );
}

function TableContents33() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents31 />
        </div>
      </div>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents33 />
    </div>
  );
}

function TableContentsTextContents32() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        223h 51m
      </p>
    </div>
  );
}

function TableContents34() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents32 />
        </div>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents34 />
    </div>
  );
}

function TableContentsTextContents33() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        223h 16m
      </p>
    </div>
  );
}

function TableContents35() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents33 />
        </div>
      </div>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents35 />
    </div>
  );
}

function TableContentsTextContents34() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        123h 10m
      </p>
    </div>
  );
}

function TableContents36() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents34 />
        </div>
      </div>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents36 />
    </div>
  );
}

function TableContentsTextContents35() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        346h 56m
      </p>
    </div>
  );
}

function TableContents37() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents35 />
        </div>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents37 />
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[110px] z-[6]" data-name="Column">
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
    </div>
  );
}

function TableContentsTextContents36() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Idle time
      </p>
    </div>
  );
}

function TitleSortingIcon7() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents36 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon9 />
    </div>
  );
}

function TableContents38() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon7 />
          <ButtonsIconButtonStandard8 />
        </div>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents38 />
    </div>
  );
}

function TableContentsTextContents37() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        84h 2m
      </p>
    </div>
  );
}

function TableContents39() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents37 />
        </div>
      </div>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents39 />
    </div>
  );
}

function TableContentsTextContents38() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        70h 48m
      </p>
    </div>
  );
}

function TableContents40() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents38 />
        </div>
      </div>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents40 />
    </div>
  );
}

function TableContentsTextContents39() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        50h 30m
      </p>
    </div>
  );
}

function TableContents41() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents39 />
        </div>
      </div>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents41 />
    </div>
  );
}

function TableContentsTextContents40() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        20h 32m
      </p>
    </div>
  );
}

function TableContents42() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents40 />
        </div>
      </div>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents42 />
    </div>
  );
}

function TableContentsTextContents41() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        100h 9m
      </p>
    </div>
  );
}

function TableContents43() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents41 />
        </div>
      </div>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents43 />
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[110px] z-[5]" data-name="Column">
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
    </div>
  );
}

function TableContentsTextContents42() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Start time
      </p>
    </div>
  );
}

function TitleSortingIcon8() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents42 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon10 />
    </div>
  );
}

function TableContents44() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon8 />
          <ButtonsIconButtonStandard9 />
        </div>
      </div>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents44 />
    </div>
  );
}

function TableContentsTextContents43() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Fri, Dec 1 2024, 11:41
      </p>
    </div>
  );
}

function TableContents45() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents43 />
    </div>
  );
}

function TableCell45() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents45 />
    </div>
  );
}

function TableContentsTextContents44() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 6 2024, 10:51
      </p>
    </div>
  );
}

function TableContents46() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents44 />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents46 />
    </div>
  );
}

function TableContentsTextContents45() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Tue, Dec 5 2024, 06:57
      </p>
    </div>
  );
}

function TableContents47() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents45 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents47 />
    </div>
  );
}

function TableContentsTextContents46() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Fri, Dec 1 2024, 18:24
      </p>
    </div>
  );
}

function TableContents48() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents46 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents48 />
    </div>
  );
}

function TableContentsTextContents47() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Fri, Dec 1 2024, 19:40
      </p>
    </div>
  );
}

function TableContents49() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents47 />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents49 />
    </div>
  );
}

function TableContentsTextContents48() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Fri, Dec 1 2024, 18:24
      </p>
    </div>
  );
}

function TableContents50() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents48 />
    </div>
  );
}

function TableCell50() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-[191px]" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents50 />
    </div>
  );
}

function TableContentsTextContents49() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Fri, Dec 1 2024, 19:40
      </p>
    </div>
  );
}

function TableContents51() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents49 />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-[191px]" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents51 />
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[4]" data-name="Column">
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
      <TableCell49 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell50 />
      <TableCell51 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
    </div>
  );
}

function TableContentsTextContents50() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Start address
      </p>
    </div>
  );
}

function TitleSortingIcon9() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents50 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon11 />
    </div>
  );
}

function TableContents52() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon9 />
          <ButtonsIconButtonStandard10 />
        </div>
      </div>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents52 />
    </div>
  );
}

function TableContentsTextContents51() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Avenue Crozet, 95, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents53() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents51 />
        </div>
      </div>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents53 />
    </div>
  );
}

function TableContentsTextContents52() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Rue Maurice Yaméogo, 176, Adjamé, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents54() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents52 />
        </div>
      </div>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents54 />
    </div>
  );
}

function TableContentsTextContents53() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Immeuble Bureau Veritas, Rue Thomasset, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents55() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents53 />
        </div>
      </div>
    </div>
  );
}

function TableCell55() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents55 />
    </div>
  );
}

function TableContentsTextContents54() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Abobo, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents56() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents54 />
        </div>
      </div>
    </div>
  );
}

function TableCell56() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents56 />
    </div>
  );
}

function Column10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[200px] z-[3]" data-name="Column">
      <TableCell52 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell53 />
      <TableCell56 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell53 />
      <TableCell56 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
    </div>
  );
}

function TableContentsTextContents55() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        End time
      </p>
    </div>
  );
}

function TitleSortingIcon10() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents55 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon12 />
    </div>
  );
}

function TableContents57() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon10 />
          <ButtonsIconButtonStandard11 />
        </div>
      </div>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents57 />
    </div>
  );
}

function TableContentsTextContents56() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 27 2024, 15:57
      </p>
    </div>
  );
}

function TableContents58() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents56 />
    </div>
  );
}

function TableCell58() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents58 />
    </div>
  );
}

function TableContentsTextContents57() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 27 2024, 9:42
      </p>
    </div>
  );
}

function TableContents59() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents57 />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents59 />
    </div>
  );
}

function TableContentsTextContents58() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 27 2024, 11:58
      </p>
    </div>
  );
}

function TableContents60() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents58 />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-[201px]" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents60 />
    </div>
  );
}

function TableContentsTextContents59() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 27 2024, 20:58
      </p>
    </div>
  );
}

function TableContents61() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents59 />
    </div>
  );
}

function TableCell61() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents61 />
    </div>
  );
}

function TableContentsTextContents60() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 27 2024, 19:38
      </p>
    </div>
  );
}

function TableContents62() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents60 />
    </div>
  );
}

function TableCell62() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents62 />
    </div>
  );
}

function TableContentsTextContents61() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Wed, Dec 27 2024, 11:58
      </p>
    </div>
  );
}

function TableContents63() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="Table / Contents">
      <TableContentsTextContents61 />
    </div>
  );
}

function TableCell63() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents63 />
    </div>
  );
}

function Column11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Column">
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell60 />
      <TableCell61 />
      <TableCell62 />
      <TableCell58 />
      <TableCell59 />
      <TableCell63 />
      <TableCell61 />
      <TableCell62 />
      <TableCell58 />
      <TableCell59 />
      <TableCell63 />
    </div>
  );
}

function TableContentsTextContents62() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Medium',sans-serif] font-medium leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        End address
      </p>
    </div>
  );
}

function TitleSortingIcon11() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title + sorting icon">
      <TableContentsTextContents62 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_6650)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.p3fdba000} fill="var(--fill-0, #6D7482)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6650">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsIconButtonStandard12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[999px] shrink-0 w-[24px]" data-name="Buttons / Icon Button / Standard">
      <Icon13 />
    </div>
  );
}

function TableContents64() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <TitleSortingIcon11 />
          <ButtonsIconButtonStandard12 />
        </div>
      </div>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[48px] items-center shrink-0 sticky top-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents64 />
    </div>
  );
}

function TableContentsTextContents63() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        IMMEUBLE MELIANE 1, Boulevard de France Prolongée, Cité mugefci, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents65() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents63 />
        </div>
      </div>
    </div>
  );
}

function TableCell65() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents65 />
    </div>
  );
}

function TableContentsTextContents64() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Grand-Bassam, Sud-Comoé, Comoé, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents66() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents64 />
        </div>
      </div>
    </div>
  );
}

function TableCell66() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents66 />
    </div>
  );
}

function TableContentsTextContents65() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        Rue Maurice Yaméogo, 176, Adjamé, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents67() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents65 />
        </div>
      </div>
    </div>
  );
}

function TableCell67() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents67 />
    </div>
  );
}

function TableContentsTextContents66() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Table / Contents / Text contents">
      <p className="[white-space-collapse:collapse] font-['Readex_Pro:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#030812] text-[14px] text-nowrap tracking-[0.25px] w-full" style={{ fontVariationSettings: "'HEXP' 0" }}>
        IMMEUBLE SOUARE, Rue Affaini Marguerite, Marcory, Abidjan, Côte d’Ivoire
      </p>
    </div>
  );
}

function TableContents68() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table / Contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <TableContentsTextContents66 />
        </div>
      </div>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="bg-white content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Table / Cell">
      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableContents68 />
    </div>
  );
}

function Column12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[200px] z-[1]" data-name="Column">
      <TableCell64 />
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
      <TableCell66 />
      <TableCell68 />
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
      <TableCell66 />
      <TableCell68 />
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex isolate items-start relative shrink-0 w-full" data-name="Contents">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
      <Column6 />
      <Column7 />
      <Column8 />
      <Column9 />
      <Column10 />
      <Column11 />
      <Column12 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_10742)" id="Icon">
          <g id="Vector"></g>
          <path d={svgPaths.pc260200} fill="var(--fill-0, black)" fillOpacity="0.38" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_10742">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonsCommonButton1() {
  return (
    <div className="bg-[#edeff2] content-stretch flex gap-[8px] h-[40px] items-center justify-center p-[12px] relative rounded-[32px] shrink-0" data-name="Buttons / Common button">
      <Icon14 />
    </div>
  );
}

function ElementsPagination() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton1 />
    </div>
  );
}

function ButtonsCommonButton2() {
  return (
    <div className="bg-indigo-600 content-stretch flex gap-[6px] items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[40px]" data-name="Buttons / Common button">
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-white tracking-[0.5px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[16px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function ElementsPagination1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton2 />
    </div>
  );
}

function ButtonsCommonButton3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[40px]" data-name="Buttons / Common button">
      <div aria-hidden="true" className="absolute border border-neutral-400 border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.5px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[16px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function ElementsPagination2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton3 />
    </div>
  );
}

function ButtonsCommonButton4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[40px]" data-name="Buttons / Common button">
      <div aria-hidden="true" className="absolute border border-neutral-400 border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.5px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[16px] whitespace-pre">...</p>
      </div>
    </div>
  );
}

function ElementsPagination3() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton4 />
    </div>
  );
}

function ButtonsCommonButton5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[40px]" data-name="Buttons / Common button">
      <div aria-hidden="true" className="absolute border border-neutral-400 border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.5px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[16px] whitespace-pre">9</p>
      </div>
    </div>
  );
}

function ElementsPagination4() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton5 />
    </div>
  );
}

function ButtonsCommonButton6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[40px]" data-name="Buttons / Common button">
      <div aria-hidden="true" className="absolute border border-neutral-400 border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-col font-['Readex_Pro:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.5px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
        <p className="leading-[16px] whitespace-pre">10</p>
      </div>
    </div>
  );
}

function ElementsPagination5() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton6 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p214cc580} fill="var(--fill-0, #030812)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonsCommonButton7() {
  return (
    <div className="bg-neutral-100 content-stretch flex gap-[8px] h-[40px] items-center justify-center p-[12px] relative rounded-[32px] shrink-0" data-name="Buttons / Common button">
      <Icon15 />
    </div>
  );
}

function ElementsPagination6() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Elements / Pagination">
      <ButtonsCommonButton7 />
    </div>
  );
}

function ElementsPaginationFullSet() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[12px] shrink-0" data-name="Elements / Pagination / Full set">
      <ElementsPagination />
      <ElementsPagination1 />
      <ElementsPagination2 />
      <ElementsPagination3 />
      <ElementsPagination4 />
      <ElementsPagination5 />
      <ElementsPagination6 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="bg-white relative rounded-bl-[12px] rounded-br-[12px] shrink-0 w-full" data-name="Pagination">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative w-full">
          <div className="flex flex-col font-['Readex_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6d7482] text-[14px] text-nowrap tracking-[0.25px]" style={{ fontVariationSettings: "'HEXP' 0" }}>
            <p className="leading-[20px] whitespace-pre">1-50 of 484</p>
          </div>
          <ElementsPaginationFullSet />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_2px_6px_2px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Table">
      <Contents />
      <Pagination />
    </div>
  );
}

export default function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="Content">
      <Frame />
      <Table />
    </div>
  );
}