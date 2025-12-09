#!/usr/bin/env python3
"""
Add average consumption column to TRANSACTIONS_SIMPLIFIED.csv
This simulates a calculated average consumption that varies around the theoretical consumption.
"""

import csv
import hashlib

def generate_average_consumption(license_plate, consumption_theoretical):
    """
    Generate a deterministic average consumption based on license plate.
    This ensures the same vehicle always has the same average consumption.
    The average varies between theoretical and +2.0 L/100km above theoretical.
    In reality, vehicles rarely consume less than theoretical consumption.
    """
    # Use license plate as base for hash (empty plates get a default value)
    if not license_plate or license_plate.strip() == '':
        license_plate = "UNKNOWN"
    
    # Use hash to get a value between 0 and 1
    hash_value = int(hashlib.md5(license_plate.encode()).hexdigest(), 16) % 10000
    variation_factor = (hash_value / 10000.0)  # 0.0 to 1.0
    
    # Map to variation range: 0.0 to +2.0 L/100km above theoretical
    # This means average consumption is always >= theoretical
    variation_liters = variation_factor * 2.0  # Range from 0.0 to +2.0
    
    # Calculate average consumption (add variation in liters)
    average_consumption = consumption_theoretical + variation_liters
    
    # Round to 2 decimal places and format as string to ensure 2 decimals are always shown
    return f"{round(average_consumption, 2):.2f}"


def add_average_consumption_column(input_file, output_file):
    """Add average consumption column to the CSV."""
    records = []
    
    # Read the CSV
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            # Get consumption theoretical
            consumption_theoretical = float(row.get('consumption_theoretical', 6.5))
            license_plate = row.get('license_plate', '')
            volume_liters = row.get('volume_liters', '')
            
            # Generate average consumption based on license plate (unique per vehicle)
            average_consumption = generate_average_consumption(license_plate, consumption_theoretical)
            
            # Calculate real consumption for this specific transaction
            # It varies around the average consumption (-5% to +20% of average)
            # This variation is deterministic based on date_time and license_plate for consistency
            date_time = row.get('date_time', '')
            consumption_real = ''
            
            if date_time and license_plate:
                # Create a hash from date_time + license_plate to get consistent variation per transaction
                hash_input = f"{license_plate}_{date_time}"
                hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16) % 10000
                variation_factor = (hash_value / 10000.0)  # 0.0 to 1.0
                
                # Map to variation range: -5% to +20% of average consumption
                # This means real consumption can be slightly less or more than average
                variation_percent = -0.05 + (variation_factor * 0.25)  # Range from -0.05 to +0.20
                
                try:
                    avg_cons_float = float(average_consumption)
                    consumption_real_value = avg_cons_float * (1 + variation_percent)
                    consumption_real = f"{round(consumption_real_value, 2):.2f}"
                except (ValueError, TypeError):
                    consumption_real = ''
            
            # Calculate real km based on average consumption: km = (volume_liters / consumption_average) * 100
            km_real = ''
            if volume_liters:
                try:
                    # Convert volume_liters to float (it might be a string)
                    vol_float = float(volume_liters) if isinstance(volume_liters, str) else float(volume_liters)
                    avg_cons_float = float(average_consumption)
                    if vol_float > 0 and avg_cons_float > 0:
                        km_real = round((vol_float / avg_cons_float) * 100, 1)
                except (ValueError, TypeError, ZeroDivisionError):
                    km_real = ''
            
            # Add to row
            row['consumption_average'] = average_consumption
            row['consumption_real'] = consumption_real
            row['km_real'] = km_real
            records.append(row)
    
    # Write back with new columns (remove duplicates if exists)
    new_fieldnames = []
    seen = set()
    for field in fieldnames:
        if field not in seen:
            seen.add(field)
            new_fieldnames.append(field)
    
    # Add new columns if they don't exist
    if 'consumption_average' not in seen:
        new_fieldnames.append('consumption_average')
    if 'consumption_real' not in seen:
        new_fieldnames.append('consumption_real')
    if 'km_real' not in seen:
        new_fieldnames.append('km_real')
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=new_fieldnames, delimiter=',')
        writer.writeheader()
        writer.writerows(records)
    
    print(f"Added consumption_average column to {output_file}")
    print(f"Processed {len(records)} records")


if __name__ == '__main__':
    input_file = 'parsed_data/TRANSACTIONS_SIMPLIFIED.csv'
    output_file = 'parsed_data/TRANSACTIONS_SIMPLIFIED.csv'
    add_average_consumption_column(input_file, output_file)

