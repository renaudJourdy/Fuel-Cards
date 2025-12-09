# Figma Make Prompt: CSV Data Table Component

## Context and Objective

You are designing a data table component for a fleet management application. The component will display fuel transaction data from a CSV file upload. The application already has established design patterns and components in Figma - please maintain consistency with the existing design system.

## Task

Create a responsive data table component that:
1. **Initial State (Empty)**: Shows a placeholder when no CSV file has been uploaded yet
2. **Data State (Populated)**: Displays all CSV columns in a table format after file upload

## Design Requirements

### Language and Localization
- **All UI text must be in French** (entire application is in French)
- Column headers must be displayed in French (see translation mapping below)
- Placeholder text, buttons, and labels must be in French

### Column Header Translations (English → French)

Use these French translations for the CSV column headers:

- `date_time` → **Date et Heure**
- `department` → **Département**
- `city` → **Ville**
- `license_plate` → **Plaque d'Immatriculation**
- `fuel_type` → **Type de Carburant**
- `vehicle_group` → **Groupe de Véhicules**
- `unit_price_euros` → **Prix Unitaire (€/L)**
- `prix_plein_euros` → **Prix Plein (€)**
- `volume_liters` → **Volume (L)**
- `consumption_theoretical` → **Consommation Théorique (L/100km)**
- `km_theoretical` → **Kilométrage Théorique (km)**
- `consumption_average` → **Consommation Moyenne (L/100km)**
- `km_real` → **Kilométrage Réel (km)**

### Initial State (Empty/Placeholder)

**Visual Requirements:**
- Display all column headers in French (as listed above)
- Show a placeholder message in French that invites the user to upload a report
- Include an upload button/area
- Maintain the table structure even when empty (ghost table)
- Use subtle, muted styling for the empty state

**Placeholder Text (French):**
- Main message: "Aucun rapport n'a encore été importé"
- Sub-message: "Téléchargez votre fichier CSV pour afficher les données de transactions"
- Button label: "Télécharger le rapport" or "Importer un fichier CSV"

### Data State (Populated)

**Visual Requirements:**
- Display all 13 columns from the CSV file
- Responsive design that adapts to different screen sizes:
  - Desktop: Full table with all columns visible
  - Tablet: Horizontal scroll with sticky first column (license plate)
  - Mobile: Card-based layout or optimized column selection
- Table should support:
  - Sorting (clickable column headers)
  - Pagination or infinite scroll for large datasets
  - Row hover states
  - Alternating row colors for readability
- Number formatting:
  - Currency values: Use French format (space as thousand separator, comma as decimal)
  - Decimal values: Show appropriate precision (1-3 decimals as per column)
  - Dates: French format (DD/MM/YYYY HH:MM)

### Design Consistency

**Critical Requirements:**
- **Match existing design system**: Use colors, typography, spacing, and component styles from the existing Figma frames
- **Follow established patterns**: Maintain consistency with other tables/data displays in the application
- **Component reusability**: Design should use or extend existing UI components (buttons, inputs, cards, etc.)
- **Accessibility**: Ensure proper contrast ratios, focus states, and keyboard navigation support

### Technical Considerations

**Data Structure:**
- CSV file contains up to 648+ rows of transaction data
- Each row represents one fuel transaction
- All columns are present in every row (no optional columns)

**File Upload:**
- Design an upload interface (button, drag-and-drop area, or file picker)
- Show upload progress/feedback
- Handle file validation (CSV format check)
- Display success/error states

## Reference Files

You will receive:
1. **COLUMN_DEFINITIONS.md**: Complete documentation of each column's meaning, data types, and usage
2. **TRANSACTIONS_SIMPLIFIED.csv**: Sample data file with actual transaction records

**Please review these files to understand:**
- The data structure and column relationships
- The meaning and context of each field
- The data ranges and formats you'll need to display

## Design Deliverables

Create the following in Figma:

1. **Empty State Frame**
   - Table structure with headers (in French)
   - Placeholder content area
   - Upload button/component
   - Appropriate spacing and visual hierarchy

2. **Populated State Frame**
   - Full data table with sample rows
   - All 13 columns displayed
   - Responsive breakpoints (Desktop, Tablet, Mobile)
   - Interactive states (hover, selected, sorted)

3. **Component Variants**
   - Empty state variant
   - Populated state variant
   - Loading state (optional)
   - Error state (optional)

4. **Design Specifications**
   - Typography scales
   - Color usage
   - Spacing system
   - Component spacing and alignment

## Success Criteria

The design should:
- ✅ Be visually consistent with existing application designs
- ✅ Display all 13 columns with French headers
- ✅ Provide clear empty state with upload invitation
- ✅ Support responsive layouts for different screen sizes
- ✅ Follow accessibility best practices
- ✅ Use French language throughout the interface
- ✅ Handle large datasets efficiently (pagination/scrolling)
- ✅ Maintain readability with proper data formatting

## Additional Notes

- Consider adding filters or search functionality for better data exploration
- Think about column width optimization (some columns like license plate are short, others like city names are longer)
- Ensure the table is scannable and easy to read
- Consider adding visual indicators for important comparisons (e.g., highlighting when km_real < km_theoretical to show overconsumption)

---

**Please use the existing Figma frames as reference for design patterns, and ensure the new component seamlessly integrates with the current application design system.**

