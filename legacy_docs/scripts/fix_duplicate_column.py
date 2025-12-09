#!/usr/bin/env python3
"""Fix duplicate consumption_average column in CSV."""

import csv

input_file = 'parsed_data/TRANSACTIONS_SIMPLIFIED.csv'
output_file = 'parsed_data/TRANSACTIONS_SIMPLIFIED.csv'

records = []
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    fieldnames = list(reader.fieldnames)
    
    # Remove duplicate consumption_average columns
    seen = set()
    unique_fieldnames = []
    for field in fieldnames:
        if field not in seen:
            seen.add(field)
            unique_fieldnames.append(field)
    
    for row in reader:
        # Keep only one consumption_average value
        if 'consumption_average' in row:
            # Take the first value (they should be the same anyway)
            value = row.get('consumption_average', '')
            # Remove all consumption_average keys
            new_row = {k: v for k, v in row.items() if k != 'consumption_average'}
            new_row['consumption_average'] = value
            records.append(new_row)
        else:
            records.append(row)

# Write back
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=unique_fieldnames, delimiter=',')
    writer.writeheader()
    writer.writerows(records)

print(f"Fixed duplicate column in {output_file}")

