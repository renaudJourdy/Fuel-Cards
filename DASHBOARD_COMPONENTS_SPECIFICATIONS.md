# Dashboard Components Specifications

## Overview
The Dashboard is split into three main sections accessible via tabs:
1. **Indicateurs clés** (KPIs) - Key performance indicators
2. **Performance flotte** (Fleet Performance) - Consumption and fuel type analysis
3. **Coûts & répartition** (Costs & Distribution) - Monthly costs and top locations

---

## 1. DashboardKpiSection Component

### Purpose
Displays key performance indicators (KPIs) in a card-based grid layout with visual hierarchy and period information.

### Props Interface
```typescript
interface KpiSectionProps {
  title: string;                    // Main section title (e.g., "Indicateurs clés")
  subtitle: string;                 // Descriptive subtitle
  periodLabel?: string;             // Optional period range (e.g., "20/11/2025 - 24/11/2025")
  kpiGroups: Kpi[][];               // Array of KPI groups (each group is an array of KPIs)
  colorClasses: typeof colorClasses; // Color palette mapping
}

interface Kpi {
  key: string;                      // Unique identifier
  label: string;                    // KPI label (e.g., "Volume Total")
  value: string;                    // Formatted value (e.g., "1 234,56 L")
  icon: React.ComponentType<{ className?: string }>; // Lucide icon component
  color: 'indigo' | 'blue' | 'green' | 'purple' | 'amber' | 'emerald';
}
```

### Color Palette
```typescript
const colorClasses = {
  indigo: "bg-indigo-50 text-indigo-600",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
};
```

### Layout Structure
- **Header Section**: Title, subtitle, and optional period badge
- **KPI Grid**: Responsive grid displaying all KPIs from `kpiGroups.flat()`
  - Mobile: 1 column
  - Tablet (sm): 2 columns
  - Desktop (xl): 3 columns

### KPI Card Specifications
- **Container**:
  - Background: Gradient from white to neutral-50
  - Border: `border-neutral-200`
  - Border radius: `16px`
  - Padding: `20px`
  - Shadow: `shadow-sm` (hover: `shadow-md`)
  - Transition: `duration-200` on hover

- **Header Row**:
  - Label: `text-sm font-medium`, color: `var(--text-secondary, #6B7280)`
  - Icon container: `p-[8px] rounded-[10px]` with color class from palette
  - Icon size: `18px`

- **Value Display**:
  - Font size: `text-3xl`
  - Font weight: `bold`
  - Color: `var(--text-primary, #030712)`
  - Font family: `var(--font-family-sans-serif, "Readex Pro")`

### Period Badge (if provided)
- Background: `bg-indigo-50`
- Text color: `text-indigo-700`
- Border: `border-indigo-100`
- Padding: `px-[14px] py-[8px]`
- Border radius: `10px`
- Icon: Calendar (16px)
- Font: `text-sm font-medium`

### Expected KPI Groups
**Group 1:**
- Period (CalendarIcon, indigo)
- Volume Total (Droplet, blue)
- Coût Total (DollarSign, green)

**Group 2:**
- Transactions (Car, purple)
- Coût Moyen du Litre (DollarSign, amber)
- Consommation Moyenne Véhicule (TrendingDown, emerald)

### Data Formatting
- Numbers: `Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`
- Currency: `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })`
- Dates: `Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })`

---

## 2. DashboardPerformanceSection Component

### Purpose
Displays fleet performance metrics through consumption analysis and fuel type distribution in a two-column layout.

### Props Interface
```typescript
interface PerformanceSectionProps {
  data: Array<Record<string, any>>;  // Transaction data from CSV
  onVehicleClick?: (licensePlate: string) => void; // Optional callback for vehicle drill-down
}
```

### Layout Structure
- **Grid Layout**: 
  - Mobile/Tablet: 1 column (stacked)
  - Desktop (xl): 3 columns
    - Consumption chart: spans 2 columns (`xl:col-span-2`)
    - Fuel type chart: spans 1 column (`xl:col-span-1`)

### Left Panel: Consumption Chart

#### Container Specifications
- Background: `bg-white`
- Border: `border-neutral-200`
- Border radius: `16px`
- Shadow: `shadow-sm`
- Padding: `20px`
- Min height: `380px`
- Layout: Flex column

#### Header
- Title: "Consommation par véhicule"
  - Font: `text-lg font-semibold`
  - Color: `var(--text-primary, #030712)`
- Subtitle: "Surperformance vs moyenne constructeur, cliquable pour filtrer."
  - Font: `text-sm`
  - Color: `var(--text-secondary, #6B7280)`
- Margin bottom: `12px`

#### Chart Container
- Flex: `flex-1`
- Min height: `320px`
- Component: `<ConsumptionChart />`

#### ConsumptionChart Component Details
**Props:**
- `data`: Array of transaction records
- `onVehicleClick`: Optional callback function

**Chart Type:** Horizontal Divergent Bar Chart (Recharts)

**Data Processing:**
1. Groups transactions by `license_plate`
2. Calculates average `consumption_real` per vehicle
3. Compares against `consumption_average` (vehicle reference)
4. Computes percentage difference: `((real - average) / average) * 100`

**Visual Encoding:**
- **X-Axis**: Vehicle license plates (rotated -45°)
- **Y-Axis**: Percentage difference (symmetric domain)
- **Bars**: 
  - Positive (red/orange): Real consumption > average
  - Negative (green): Real consumption ≤ average
- **Color Thresholds:**
  - Green: `≤ 0%` (background: `#DCFCE7`, text: `#14532D`)
  - Yellow: `> 0%` and `< 10%` (background: `#FEF9C3`, text: `#713F12`)
  - Red: `≥ 10%` (background: `#FEE2E2`, text: `#7F1D1D`)

**Reference Lines:**
- Zero line: `#9CA3AF`, dashed
- +10% threshold: `#DC2626`, dashed, 50% opacity
- -10% threshold: `#16A34A`, dashed, 50% opacity

**Interactivity:**
- Bars are clickable if `onVehicleClick` is provided
- Tooltip shows: license plate, average consumption, real consumption, percentage difference
- Horizontal scrolling if many vehicles

**Bar Specifications:**
- Max bar size: `40px`
- Category gap: `10%`
- Border radius: `[4, 4, 0, 0]` (top corners only)
- Labels: Percentage displayed on bars (hidden if < 0.5%)

### Right Panel: Fuel Type Chart

#### Container Specifications
- Background: `bg-white`
- Border: `border-neutral-200`
- Border radius: `16px`
- Shadow: `shadow-sm`
- Padding: `20px`
- Min height: `360px`
- Layout: Flex column

#### Header
- Title: "Mix carburant"
  - Font: `text-lg font-semibold`
  - Color: `var(--text-primary, #030712)`
- Margin bottom: `12px`

#### Chart Container
- Flex: `flex-1`
- Min height: `280px`
- Component: `<FuelTypeChart />`

#### FuelTypeChart Component Details
**Props:**
- `data`: Array of transaction records

**Chart Type:** Donut/Pie Chart (Recharts)

**Data Processing:**
1. Groups transactions by `fuel_type`
2. Sums `volume_liters` per fuel type
3. Calculates percentage of total volume
4. Sorts by volume (descending)

**Visual Encoding:**
- **Chart Type**: Pie/Donut with inner radius
- **Colors**: Harmonious palette
  - `['#4F46E5', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#EF4444', '#F59E0B', '#EAB308']`
- **Legend**: Shows fuel type name and percentage
- **Tooltip**: Shows fuel type, volume (L), and percentage

**Styling:**
- Consistent color palette (not random)
- Legend positioned appropriately
- Responsive sizing

---

## 3. DashboardCostsSection Component

### Purpose
Displays cost evolution over time and top locations by expenditure in a two-column layout.

### Props Interface
```typescript
interface CostsSectionProps {
  data: Array<Record<string, any>>;  // Transaction data from CSV
}
```

### Layout Structure
- **Grid Layout**: 
  - Mobile/Tablet: 1 column (stacked)
  - Desktop (xl): 3 columns
    - Monthly cost chart: spans 1 column (`xl:col-span-1`)
    - Top locations chart: spans 2 columns (`xl:col-span-2`)

### Left Panel: Monthly Cost Chart

#### Container Specifications
- Background: `bg-white`
- Border: `border-neutral-200`
- Border radius: `16px`
- Shadow: `shadow-sm`
- Padding: `20px`
- Min height: `380px`
- Layout: Flex column

#### Header
- Title: "Évolution mensuelle des coûts"
  - Font: `text-lg font-semibold`
  - Color: `var(--text-primary, #030712)`
- Margin bottom: `12px`

#### Chart Container
- Flex: `flex-1`
- Min height: `320px`
- Component: `<MonthlyCostChart />`

#### MonthlyCostChart Component Details
**Props:**
- `data`: Array of transaction records

**Chart Type:** Line Chart (Recharts)

**Data Processing:**
1. Groups transactions by month (using `date_time`)
2. Sums `prix_plein_euros` per month
3. Optionally tracks `volume_liters` per month
4. Formats months as "MMM YYYY" (e.g., "nov. 2025")

**Visual Encoding:**
- **X-Axis**: Months (formatted in French)
- **Y-Axis**: Cost in euros (€)
- **Line**: Cost evolution over time
- **Optional**: Secondary line for volume (if dual-axis needed)

**Styling:**
- Smooth line with markers
- Grid lines for readability
- Tooltip shows month, cost, and volume
- Legend if multiple series

**Data Handling:**
- Handles missing months (gaps in data)
- Sorts chronologically
- Handles edge cases (no data, single month, etc.)

### Right Panel: Top Locations Chart

#### Container Specifications
- Background: `bg-white`
- Border: `border-neutral-200`
- Border radius: `16px`
- Shadow: `shadow-sm`
- Padding: `20px`
- Min height: `360px`
- Layout: Flex column

#### Header
- Title: "Top 10 des localisations"
  - Font: `text-lg font-semibold`
  - Color: `var(--text-primary, #030712)`
- Margin bottom: `12px`

#### Chart Container
- Flex: `flex-1`
- Min height: `280px`
- Component: `<TopLocationsChart />`

#### TopLocationsChart Component Details
**Props:**
- `data`: Array of transaction records
- `topN`: Number of top locations to display (default: 10)

**Chart Type:** Horizontal Bar Chart (Recharts)

**Data Processing:**
1. Groups transactions by location (`city_department` or `city`)
2. Sums `prix_plein_euros` per location
3. Optionally tracks `volume_liters` per location
4. Sorts by cost (descending)
5. Takes top N locations

**Visual Encoding:**
- **X-Axis**: Cost in euros (€)
- **Y-Axis**: Location names
- **Bars**: Horizontal bars representing cost
- **Color Scheme**: Single base color with opacity variation
  - Base color: `#4F46E5` (indigo)
  - Top 3: Full opacity (100%)
  - Others: Progressive opacity (40% to 100% based on rank)

**Color Function:**
```typescript
const getColorWithOpacity = (index: number, total: number) => {
  if (index < 3) {
    return BASE_COLOR; // Full opacity for top 3
  }
  const opacity = Math.max(0.4, 1 - (index / total) * 0.6);
  return `${BASE_COLOR}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};
```

**Styling:**
- Horizontal layout for better readability
- Consistent color with hierarchy (top 3 emphasized)
- Tooltip shows location, cost, and volume
- Responsive sizing

**Data Handling:**
- Handles missing location data
- Aggregates by location name
- Limits to top N (default 10)

---

## Common Design System

### Typography
- **Font Family**: `var(--font-family-sans-serif, "Readex Pro")`
- **Primary Text**: `var(--text-primary, #030712)`
- **Secondary Text**: `var(--text-secondary, #6B7280)`

### Spacing
- **Gap between sections**: `16px`
- **Card padding**: `20px`
- **Header margin bottom**: `12px`
- **Grid gap**: `16px`

### Colors
- **Background**: White (`bg-white`)
- **Borders**: `border-neutral-200` or `border-neutral-100`
- **Shadows**: `shadow-sm` (hover: `shadow-md`)
- **Border radius**: `16px` for cards, `10px` for badges

### Responsive Breakpoints
- **Mobile**: Default (1 column)
- **Tablet (sm)**: `640px` (2 columns for KPIs)
- **Desktop (xl)**: `1280px` (3 columns for KPIs, 3-column grid for charts)

### Animations
- **Hover transitions**: `duration-200`
- **Card hover**: Shadow elevation change
- **Smooth transitions** for all interactive elements

---

## Data Requirements

### Required CSV Fields
All components expect transaction data with the following fields:
- `date_time`: ISO date string
- `license_plate`: Vehicle license plate
- `consumption_average`: Average consumption (L/100km)
- `consumption_real`: Real consumption (L/100km)
- `volume_liters`: Volume in liters
- `prix_plein_euros`: Full cost in euros
- `fuel_type`: Fuel type name
- `city` or `city_department`: Location name

### Data Validation
- All components handle missing/null data gracefully
- Numeric fields are parsed with `parseFloat()` and validated with `isNaN()`
- Date fields are validated with `isNaN(date.getTime())`
- Empty arrays return empty states or default values

---

## Error Handling

### Empty Data States
- All components check for empty data arrays
- Display appropriate messages or empty states
- Prevent crashes from undefined/null values

### Invalid Data
- Numeric parsing with fallback to `0`
- Date parsing with validation
- Filter out invalid records before processing

---

## Performance Considerations

### Memoization
- All chart data calculations use `useMemo` with proper dependencies
- Prevents unnecessary recalculations on re-renders

### Chart Rendering
- Recharts `ResponsiveContainer` for automatic sizing
- Efficient data structures for grouping/aggregation
- Limit data points when necessary (e.g., top N)

---

## Accessibility

### ARIA Labels
- Chart containers should have descriptive labels
- Interactive elements (buttons, bars) should have `aria-label`
- Screen reader friendly tooltips

### Keyboard Navigation
- Tab navigation for interactive elements
- Enter/Space for button activation
- Arrow keys for chart navigation (if implemented)

### Color Contrast
- All text meets WCAG AA contrast requirements
- Color coding supplemented with text labels
- Tooltips provide full information

---

## Future Enhancements

### Potential Additions
1. **Export functionality**: Download charts as images/PDF
2. **Date range picker**: More granular period selection
3. **Comparison mode**: Compare multiple periods
4. **Drill-down tables**: Click chart elements to see detailed data
5. **Custom KPI configuration**: User-defined KPIs
6. **Real-time updates**: Live data refresh
7. **Print optimization**: Print-friendly layouts


