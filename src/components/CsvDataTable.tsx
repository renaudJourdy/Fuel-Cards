import React, { useState } from 'react';
import { Upload, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import svgPaths from "../imports/svg-9qh9cqqme2";
import { Badge } from "./ui/badge";

// Column definitions with French headers - Optimized order for UX
const COLUMNS = [
  { key: 'date_time', label: 'Date et Heure', width: 'w-[180px]', sticky: true, leftPosition: 0 },
  { key: 'license_plate', label: 'Immatriculation', width: 'w-[160px]', sticky: true, leftPosition: 180, lastSticky: true },
  { key: 'consumption_average', label: 'Consommation Moyenne (L/100km)', width: 'w-[260px]' },
  { key: 'consumption_real', label: 'Consommation Réelle (L/100km)', width: 'w-[240px]' },
  { key: 'volume_liters', label: 'Volume (L)', width: 'w-[130px]' },
  { key: 'prix_plein_euros', label: 'Tarif Plein (€)', width: 'w-[150px]' },
  { key: 'unit_price_euros', label: 'Tarif Unitaire (€/L)', width: 'w-[170px]' },
  { key: 'fuel_type', label: 'Type de Carburant', width: 'w-[180px]' },
  { key: 'city_department', label: 'Ville', width: 'w-[200px]' },
];

const ITEMS_PER_PAGE = 10;

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

interface CsvDataTableProps {
  onFileUpload?: (data: Array<Record<string, any>>) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

// CSV Parser function
function parseCSV(csvText: string): Array<Record<string, any>> {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data: Array<Record<string, any>> = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length === headers.length) {
      const row: Record<string, any> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      data.push(row);
    }
  }

  return data;
}

export function CsvDataTable({ onFileUpload, fileInputRef }: CsvDataTableProps) {
  const [data, setData] = useState<Array<Record<string, any>> | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSort = (key: string) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      const parsedData = parseCSV(text);
      setData(parsedData);
      setCurrentPage(1);
      if (onFileUpload) {
        onFileUpload(parsedData);
      }
    }
  };

  const formatValue = (key: string, value: any, row?: Record<string, any>) => {
    // Merge city and department (check this first before null check)
    if (key === 'city_department' && row) {
      const city = row.city || '';
      const department = row.department || '';
      if (city && department) {
        return `${city} (${department})`;
      }
      return city || department || '-';
    }

    if (value === null || value === undefined || value === '') return '-';

    // Format consumption_real with percentage difference as colored badge
    if (key === 'consumption_real' && row && row.consumption_average) {
      const real = parseFloat(value);
      const average = parseFloat(row.consumption_average);

      if (!isNaN(real) && !isNaN(average) && average !== 0) {
        const percentDiff = ((real - average) / average) * 100;
        const formattedReal = new Intl.NumberFormat('fr-FR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(real);
        const formattedPercent = new Intl.NumberFormat('fr-FR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
          signDisplay: 'always',
        }).format(percentDiff);

        // Determine badge style based on percentage
        const baseBadgeStyle = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '4px',
          paddingBottom: '4px',
          fontSize: '14px',
          fontWeight: 400,
          fontFamily: 'inherit',
          whiteSpace: 'nowrap' as const
        };

        let badgeStyle = {};
        if (percentDiff <= 0) {
          // Success - green with light background
          badgeStyle = {
            ...baseBadgeStyle,
            backgroundColor: '#DCFCE7',
            color: '#14532D'
          };
        } else if (percentDiff > 0 && percentDiff < 10) {
          // Warning - yellow with light background
          badgeStyle = {
            ...baseBadgeStyle,
            backgroundColor: '#FEF9C3',
            color: '#713F12'
          };
        } else {
          // Destructive - red with light background
          badgeStyle = {
            ...baseBadgeStyle,
            backgroundColor: '#FEE2E2',
            color: '#7F1D1D'
          };
        }

        return {
          type: 'consumption_real',
          value: formattedReal,
          percent: formattedPercent,
          badgeStyle
        };
      }

      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(real);
    }

    // Format currency values
    if (key === 'unit_price_euros' || key === 'prix_plein_euros') {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }).format(parseFloat(value));
    }

    // Format decimal values
    if (key === 'volume_liters' || key === 'consumption_average') {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(parseFloat(value));
    }

    return value;
  };

  const sortedData = data && sortConfig.direction
    ? [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Special handling for city_department sorting
      if (sortConfig.key === 'city_department') {
        aValue = a.city || '';
        bValue = b.city || '';
      }

      // Special handling for consumption_real sorting (use numeric value only)
      if (sortConfig.key === 'consumption_real') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    })
    : data;

  // Filter data based on search query
  const filteredData = sortedData && searchQuery
    ? sortedData.filter((row) => {
      const query = searchQuery.toLowerCase();
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(query)
      );
    })
    : sortedData;

  // Pagination
  const totalPages = filteredData ? Math.ceil(filteredData.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 1, totalPages);
      } else {
        pages.push(1, 2, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  // Empty state
  if (!data) {
    return (
      <div className="flex flex-col gap-[8px] w-full">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Placeholder container - no shadow, no border */}
        <div className="content-stretch flex flex-col gap-[20px] items-center min-h-[600px] justify-center px-[24px] py-[80px] w-full">
          {/* Illustration */}
          <div className="bg-neutral-100 content-stretch flex items-center justify-center rounded-[999px] shrink-0 size-[144px]">
            <Upload className="size-[64px] text-[#E5E5E5]" strokeWidth={1.5} />
          </div>

          {/* Text */}
          <div className="content-stretch flex flex-col gap-[6px] items-center leading-[0] shrink-0 text-center tracking-[0.25px] w-full">
            <div className="flex flex-col justify-center min-w-full shrink-0 text-foreground w-[min-content]">
              <p className="leading-[24px]">Importer des transactions carburant</p>
            </div>
            <div className="flex flex-col justify-center shrink-0 text-muted-foreground w-[400px]">
              <p className="leading-[20px]">Téléchargez votre fichier CSV d&apos;export TotalEnergies pour afficher et analyser vos données de transactions.</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => fileInputRef?.current?.click()}
            className="bg-indigo-600 content-stretch flex gap-[10px] h-[48px] items-center justify-center p-[16px] rounded-[8px] shrink-0 hover:bg-indigo-700 transition-colors"
          >
            <span className="text-white leading-[20px] whitespace-pre">
              Importez vos données
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Populated state
  return (
    <div className="flex flex-col gap-[8px] w-full flex-1 min-h-0 overflow-hidden">
      {/* Hidden file input for re-upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Table info */}
      <div className="flex items-center justify-between w-full shrink-0">
        <div className="content-stretch flex gap-[10px] items-center">
          <div className="flex flex-col justify-center shrink-0 text-nowrap">
            <p
              className="whitespace-pre"
              style={{
                color: 'var(--text-primary, #030712)',
                fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                fontSize: 'var(--font-size-1rem, 16px)',
                fontStyle: 'normal',
                fontWeight: 'var(--font-weight-Medium, 500)',
                lineHeight: 'var(--line-height-15-rem, 24px)',
                letterSpacing: 'var(--letter-spacing-15-em, 0.25px)',
              }}
            >
              {filteredData?.length || 0} transaction{(filteredData?.length || 0) > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="content-stretch flex flex-col h-[30px] items-center justify-center rounded-[999px] shrink-0 transition-colors hover:bg-muted/30"
            aria-label="Rechercher"
          >
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g clipPath="url(#clip0_1_6668)">
                  <g></g>
                  <path d={svgPaths.p730dd00} fill="var(--fill-0, #4F46E5)" />
                </g>
                <defs>
                  <clipPath id="clip0_1_6668">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>

          {isSearchOpen && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 300 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative flex items-center overflow-hidden"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Rechercher..."
                  style={{ borderBottomColor: 'var(--fill-0, #4F46E5)' }}
                  className="border-0 border-b-2 pl-[12px] pr-[36px] py-[8px] text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-[8px] p-[4px] hover:bg-neutral-100 rounded-[4px] transition-colors"
                  aria-label="Fermer la recherche"
                >
                  <svg className="size-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Table wrapper - matches Figma design */}
      <div className="bg-white flex flex-col items-center overflow-hidden rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_2px_6px_2px_rgba(0,0,0,0.05)] flex-1 min-h-0 w-full">
        {/* Single horizontal scroll container for both header and body */}
        <div className={`${paginatedData && paginatedData.length > 0 ? 'overflow-x-auto' : 'overflow-hidden'} w-full custom-scrollbar flex flex-col flex-1 min-h-0`}>
          {/* Header - fixed, no vertical scroll */}
          <div className="w-full shrink-0">
            <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
              {/* Header */}
              <thead>
                <tr className="bg-neutral-100">
                  {COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      style={column.sticky ? {
                        position: 'sticky',
                        left: `${column.leftPosition}px`,
                        zIndex: 20,
                        backgroundColor: 'var(--color-neutral-100)',
                        boxShadow: column.lastSticky ? '2px 0 4px rgba(0,0,0,0.06)' : 'none',
                        width: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : undefined,
                        minWidth: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : undefined
                      } : {
                        zIndex: 1,
                        width: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : column.width === 'w-[200px]' ? '200px' : column.width === 'w-[170px]' ? '170px' : column.width === 'w-[150px]' ? '150px' : column.width === 'w-[130px]' ? '130px' : column.width === 'w-[240px]' ? '240px' : column.width === 'w-[260px]' ? '260px' : undefined,
                        minWidth: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : column.width === 'w-[200px]' ? '200px' : column.width === 'w-[170px]' ? '170px' : column.width === 'w-[150px]' ? '150px' : column.width === 'w-[130px]' ? '130px' : column.width === 'w-[240px]' ? '240px' : column.width === 'w-[260px]' ? '260px' : undefined
                      }}
                      className={`${column.width} h-[48px] px-0 text-left relative bg-neutral-100 ${column.sticky ? 'sticky' : ''
                        } ${column.lastSticky ? 'shadow-[2px_0_4px_rgba(0,0,0,0.06)]' : ''}`}
                    >
                      <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                      <button
                        onClick={() => handleSort(column.key)}
                        style={{ width: '100%', minWidth: 0 }}
                        className="content-stretch flex items-center px-[16px] py-0 size-full hover:bg-muted/30 transition-colors overflow-hidden"
                      >
                        <div className="flex flex-col items-start justify-center flex-1 min-w-0 mr-[8px]">
                          <span className="text-muted-foreground whitespace-nowrap w-full text-left block">
                            {column.label}
                          </span>
                        </div>
                        <div className="shrink-0 w-[16px] h-[16px] flex items-center justify-center">
                          {sortConfig.key === column.key && (
                            <>
                              {sortConfig.direction === 'asc' ? (
                                <ChevronUp className="size-[16px] text-muted-foreground" />
                              ) : (
                                <ChevronDown className="size-[16px] text-muted-foreground" />
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* Body - scrollable vertically only, horizontal scroll handled by parent */}
          <div
            className={`${paginatedData && paginatedData.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'} w-full custom-scrollbar flex-1 min-h-0`}
          >
            <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
              {/* Body */}
              <tbody>
                {paginatedData && paginatedData.length > 0 && (
                  paginatedData.map((row, index) => (
                    <tr
                      key={startIndex + index}
                      className="bg-white"
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {COLUMNS.map((column) => (
                        <td
                          key={column.key}
                          style={column.sticky ? {
                            position: 'sticky',
                            left: `${column.leftPosition}px`,
                            zIndex: 20,
                            backgroundColor: hoveredRow === index ? 'var(--muted)' : '#ffffff',
                            boxShadow: column.lastSticky ? '2px 0 4px rgba(0,0,0,0.06)' : 'none',
                            width: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : undefined,
                            minWidth: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : undefined
                          } : {
                            zIndex: 1,
                            width: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : column.width === 'w-[200px]' ? '200px' : column.width === 'w-[170px]' ? '170px' : column.width === 'w-[150px]' ? '150px' : column.width === 'w-[130px]' ? '130px' : column.width === 'w-[240px]' ? '240px' : column.width === 'w-[260px]' ? '260px' : undefined,
                            minWidth: column.width === 'w-[180px]' ? '180px' : column.width === 'w-[160px]' ? '160px' : column.width === 'w-[200px]' ? '200px' : column.width === 'w-[170px]' ? '170px' : column.width === 'w-[150px]' ? '150px' : column.width === 'w-[130px]' ? '130px' : column.width === 'w-[240px]' ? '240px' : column.width === 'w-[260px]' ? '260px' : undefined
                          }}
                          className={`${column.width} h-[64px] px-0 relative ${column.sticky ? 'sticky' : ''
                            } ${hoveredRow === index ? 'bg-muted' : column.sticky ? 'bg-white' : 'bg-white'} ${column.lastSticky ? 'shadow-[2px_0_4px_rgba(0,0,0,0.06)]' : ''
                            }`}
                        >
                          <div aria-hidden="true" className="absolute border-[#dbdee4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                          <div className={`content-stretch flex items-center px-[16px] py-0 size-full transition-colors ${hoveredRow === index ? 'bg-muted' : 'bg-white'
                            }`}>
                            {(() => {
                              const formatted = formatValue(column.key, row[column.key], row);
                              if (typeof formatted === 'object' && formatted.type === 'consumption_real') {
                                return (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span className="text-foreground whitespace-nowrap">
                                      {formatted.value}
                                    </span>
                                    <span style={formatted.badgeStyle}>
                                      {formatted.percent}%
                                    </span>
                                  </div>
                                );
                              }
                              return (
                                <div className="content-stretch flex flex-col items-start justify-center">
                                  <span className="text-foreground w-full">
                                    {formatted}
                                  </span>
                                </div>
                              );
                            })()}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state - centered on viewport */}
        {(!paginatedData || paginatedData.length === 0) && (
          <div className="flex items-center justify-center h-[400px] w-full">
            <div
              className="text-center"
              style={{
                color: 'var(--text-secondary, #6B7280)',
                fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                fontSize: 'var(--font-size-1rem, 16px)',
                fontWeight: 'var(--font-weight-Medium, 500)',
                lineHeight: 'var(--line-height-15-rem, 24px)',
                letterSpacing: 'var(--letter-spacing-15-em, 0.25px)',
              }}
            >
              Aucun résultat trouvé
            </div>
          </div>
        )}

        {/* Pagination - matches Figma design */}
        {totalPages > 1 && (
          <div className="bg-white rounded-bl-[12px] rounded-br-[12px] shrink-0 w-full relative" style={{ paddingTop: '24px' }}>
            {/* Separator line using design system variable */}
            <div className="absolute left-0 right-0 top-0 h-px">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1094 1">
                <line stroke="var(--stroke-0, #E5E5E5)" x2="1094" y1="0.5" y2="0.5" />
              </svg>
            </div>
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] w-full">
                <div className="flex flex-col justify-center leading-[0] shrink-0 text-muted-foreground text-nowrap">
                  <span className="leading-[20px] whitespace-pre">
                    {startIndex + 1}-{Math.min(endIndex, data.length)} sur {data.length}
                  </span>
                </div>

                <div className="content-stretch flex gap-[8px] items-center rounded-[12px] shrink-0">
                  {/* Previous button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-[#edeff2] content-stretch flex gap-[8px] h-[40px] items-center justify-center p-[12px] rounded-[32px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="size-[18px] text-foreground" />
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((pageNum, index) => {
                    if (pageNum === '...') {
                      return (
                        <div
                          key={`ellipsis-${index}`}
                          className="content-stretch flex gap-[6px] items-center justify-center p-[10px] rounded-[32px] shrink-0 size-[40px]"
                        >
                          <span className="text-neutral-600">...</span>
                        </div>
                      );
                    }

                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum as number)}
                        className={`${isActive
                          ? 'bg-indigo-600'
                          : 'border border-neutral-400 border-solid'
                          } content-stretch flex gap-[6px] items-center justify-center p-[10px] rounded-[32px] shrink-0 size-[40px]`}
                      >
                        <span className={`${isActive ? 'text-white' : 'text-neutral-600'
                          } leading-[16px] whitespace-pre`}>
                          {pageNum}
                        </span>
                      </button>
                    );
                  })}

                  {/* Next button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-[#edeff2] content-stretch flex gap-[8px] h-[40px] items-center justify-center p-[12px] rounded-[32px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="size-[18px] text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}