import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { CsvDataTable } from './components/CsvDataTable';

export default function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (data: Array<Record<string, any>>) => {
    console.log(`Fichier importé avec ${data.length} transactions`);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // The CsvDataTable component will handle the actual parsing
      // We just trigger the click
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <div className="max-w-[1400px] mx-auto w-full" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <div className="content-stretch flex items-center justify-between overflow-clip py-[16px] px-0 w-full">
            <div className="content-stretch flex items-center shrink-0">
              <div className="content-stretch flex items-center shrink-0">
                <h4 className="text-foreground text-nowrap whitespace-pre">
                  Cartes Carburant
                </h4>
              </div>
            </div>
            
            <div className="shrink-0">
              <div className="flex flex-row items-center justify-center">
                <button
                  onClick={handleUploadClick}
                  className="content-stretch flex gap-[8px] items-center justify-center p-[12px] rounded-[8px] transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-button-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="overflow-clip shrink-0 size-[18px]">
                    <Upload className="size-full" style={{ color: 'var(--fill-0)' }} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col justify-center leading-[0] shrink-0 text-nowrap">
                    <span style={{ color: 'var(--fill-0)' }} className="leading-[20px] whitespace-pre">Importez vos données</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="h-0 w-full">
            <div className="relative bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block w-full h-[1px]" fill="none" preserveAspectRatio="none" viewBox="0 0 1094 1">
                <line stroke="var(--color-border)" x2="1094" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto overflow-hidden flex flex-col min-h-0 w-full" style={{ height: 'calc(100vh - 80px)', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '16px', paddingRight: '16px', boxSizing: 'border-box', minWidth: 0 }}>
        <CsvDataTable 
          onFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
}