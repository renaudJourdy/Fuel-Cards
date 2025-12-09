# Column Definitions for TRANSACTIONS_SIMPLIFIED.csv

This document provides definitions for all columns in the simplified transactions CSV file generated from TotalEnergies Fleet export data.

## Column Definitions

### `date_time`
**Type:** String (DateTime format: YYYY-MM-DD HH:MM)  
**Description:** Date and time when the fuel transaction occurred. Format: Year-Month-Day Hour:Minute (e.g., "2025-11-20 15:07").

### `department`
**Type:** String (2-digit code)  
**Description:** French department code (département) where the transaction took place. This is a 2-digit numeric code representing the administrative division in France (e.g., "64" for Pyrénées-Atlantiques).

### `city`
**Type:** String  
**Description:** Name of the city or location where the fuel station is located (e.g., "BAYONNE", "PAU", "JURANCON").

### `license_plate`
**Type:** String  
**Description:** Vehicle license plate number (immatriculation) in French format (e.g., "DR-943-HL", "GX-898-RM"). This uniquely identifies each vehicle in the fleet.

### `fuel_type`
**Type:** String  
**Description:** Type of fuel purchased. Common values include:
- "Gazole Premier" (Premium Diesel)
- "Gazole Excellium" (Premium Diesel Excellium)
- "Diesel B10" (B10 Biodiesel)
- "Sans Plomb 95 E10" (95 Octane E10 Unleaded)
- "Super 98 Sans PL" (98 Octane Unleaded)
- "Super 95 Sans PL" (95 Octane Unleaded)

### `vehicle_group`
**Type:** String  
**Description:** Vehicle group classification. Common values include:
- "GAZOLE" (Diesel vehicles group)
- "TOUS SUPER ET GPL" (All Super and LPG vehicles group)
- "CABINET" (Cabinet/Office vehicles)
- "CD3" (Specific vehicle category)

### `unit_price_euros`
**Type:** Float (3 decimal places)  
**Description:** Unit price per liter of fuel in euros. This represents the price paid for one liter of fuel at the time of purchase (e.g., 1.829 €/L).

### `prix_plein_euros`
**Type:** Float  
**Description:** Total amount paid for the full tank fill-up in euros. This is the complete transaction amount including all taxes (TTC - toutes taxes comprises).

### `volume_liters`
**Type:** Float (2 decimal places)  
**Description:** Volume of fuel purchased in liters. This is calculated as: `prix_plein_euros / unit_price_euros`. Represents the actual quantity of fuel dispensed during the transaction.

### `consumption_theoretical`
**Type:** Float  
**Description:** Theoretical fuel consumption in liters per 100 kilometers (L/100km). This is a standard reference value based on the fuel type:
- **6.0 L/100km** for Diesel/Gazole/B10 vehicles (modern vehicles)
- **7.0 L/100km** for Petrol/Unleaded vehicles (modern vehicles)

This value represents the expected consumption under ideal conditions for modern vehicles.

### `km_theoretical`
**Type:** Float (1 decimal place)  
**Description:** Theoretical distance traveled since the last fill-up, calculated using the theoretical consumption. Formula: `(volume_liters / consumption_theoretical) * 100`.  
This represents the distance the vehicle should have traveled based on the fuel purchased and the theoretical consumption rate.

### `consumption_average`
**Type:** Float (2 decimal places)  
**Description:** Average fuel consumption in liters per 100 kilometers (L/100km) based on historical data. This value is unique per vehicle (determined by license plate) and represents the actual average consumption observed over time.  
The value varies between the theoretical consumption and +2.0 L/100km above theoretical, reflecting real-world driving conditions where vehicles typically consume more than theoretical values.

### `km_real`
**Type:** Float (1 decimal place)  
**Description:** Real distance traveled since the last fill-up, calculated using the average consumption. Formula: `(volume_liters / consumption_average) * 100`.  
This represents the actual distance the vehicle likely traveled based on the fuel purchased and the vehicle's historical average consumption.  
**Comparison:** When `km_real` < `km_theoretical`, it indicates the vehicle is consuming more fuel than expected (overconsumption).

### `consumption_real`
**Type:** Float (2 decimal places)  
**Description:** Real fuel consumption for this specific transaction in liters per 100 kilometers (L/100km). This value represents the actual consumption observed for this particular fill-up, which varies around the vehicle's average consumption.  
The value is calculated by applying a variation factor (between -5% and +20%) to the `consumption_average` for each transaction. This variation is deterministic and unique per transaction (based on date/time and license plate), ensuring realistic fluctuations that reflect real-world driving conditions, traffic, weather, and driving style variations.  
**Usage:** Compare `consumption_real` with `consumption_average` to identify transactions with abnormal consumption. The percentage difference can be calculated as: `((consumption_real - consumption_average) / consumption_average) * 100`.  
**Example:** If `consumption_average` = 6.40 L/100km and `consumption_real` = 7.51 L/100km, this represents a +17.3% increase compared to the vehicle's usual consumption.

## Usage Notes

- **Comparing `km_theoretical` vs `km_real`**: This comparison helps identify vehicles with abnormal fuel consumption patterns. A significant difference indicates potential issues or inefficient driving habits.
- **Comparing `consumption_average` vs `consumption_real`**: This comparison shows the variation in consumption for each specific transaction compared to the vehicle's historical average. Positive percentages indicate higher consumption than usual for that transaction.
- **Vehicle consistency**: Each vehicle (identified by `license_plate`) maintains consistent `consumption_average` values across all transactions, allowing for accurate historical analysis. However, `consumption_real` varies per transaction to reflect real-world fluctuations.
- **Filtering**: Transactions for non-fuel products (washing, lubricants, AdBlue, accessories) are excluded from this simplified dataset.

