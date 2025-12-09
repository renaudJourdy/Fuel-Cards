#!/usr/bin/env python3
"""
Parser for TotalEnergies Fleet export files.
Extracts BA, BJ, and BR records into structured CSV tables.
"""

import csv
import re
import sys
from pathlib import Path
from datetime import datetime


def parse_amount(amount_str):
    """Parse amount string to integer (cents). Handles negative signs."""
    if not amount_str or amount_str.strip() == '':
        return None
    # Remove spaces and extract sign
    cleaned = amount_str.strip().replace(' ', '')
    if cleaned.startswith('-'):
        sign = -1
        cleaned = cleaned[1:]
    elif cleaned.startswith('+'):
        sign = 1
        cleaned = cleaned[1:]
    else:
        sign = 1
    
    try:
        return int(cleaned) * sign
    except ValueError:
        return None


def parse_ba_line(line):
    """Parse a BA (billing/account header) line."""
    record = {
        'record_type': 'BA',
        'raw_line': line
    }
    
    # BA TF72411087724110    75249496202511302025123007...
    # Extract account ID (TF724110 pattern)
    account_match = re.search(r'BA\s+(TF\d{6})', line)
    if account_match:
        account_id = account_match.group(1)
        record['account_id'] = account_id
        
        # Extract card/contract number (8 digits immediately after account ID)
        remaining = line[account_match.end():]
        card_match = re.match(r'([0-9]{8})', remaining.strip())
        if card_match:
            record['card_or_contract_number'] = card_match.group(1)
    
    # Extract dates (look for YYYYMMDD patterns, typically 2025MMDD)
    date_pattern = r'(20\d{6})'
    dates = re.findall(date_pattern, line)
    if len(dates) >= 1:
        record['period_end_date_raw'] = dates[0]
    if len(dates) >= 2:
        record['due_date_raw'] = dates[1]
    
    # Extract total amount (large numeric block before EUR, with optional minus)
    # Pattern: "0000000147753-" before EUR
    amount_match = re.search(r'([0-9]{13,}[-+]?)\s*EUR', line)
    if amount_match:
        record['total_amount_raw'] = amount_match.group(1).strip()
    
    # Extract currency
    if 'EUR' in line:
        record['currency'] = 'EUR'
    
    # Additional fields
    record['ba_field_1'] = line[50:100].strip() if len(line) > 50 else ''
    record['ba_field_2'] = line[100:150].strip() if len(line) > 100 else ''
    
    return record


def parse_bj_line(line):
    """Parse a BJ (subtotal) line."""
    record = {
        'record_type': 'BJ',
        'raw_line': line
    }
    
    # BJ TF724110K51662027524949672411087724110    K516620225020251130...
    # Extract account ID (TF724110 pattern)
    account_match = re.search(r'BJ\s+(TF\d{6})', line)
    if account_match:
        account_id = account_match.group(1)
        record['account_id'] = account_id
        
        # Extract card number (alphanumeric code after account ID, like K5166202)
        remaining = line[account_match.end():]
        card_match = re.search(r'([A-Z]\d{7})', remaining[:30])
        if card_match:
            record['card_number'] = card_match.group(1)
    
    # Extract dates (look for pattern like 25020251130 or 20251130)
    # The date appears after the second occurrence of the card number, like "K516620225020251130"
    # Pattern: card number followed by digits ending with YYYYMMDD (20 followed by 6 digits)
    if 'card_number' in record:
        # Find all occurrences of the card number
        card_num = record['card_number']
        # Look for pattern: card_number followed by digits, ending with YYYYMMDD
        # Pattern: "K516620225020251130" -> extract "20251130"
        pattern = re.escape(card_num) + r'(\d{2,3})(20\d{6})'
        date_match = re.search(pattern, line)
        if date_match:
            record['period_end_date_raw'] = date_match.group(2)
    else:
        # Fallback: find any YYYYMMDD pattern
        date_match = re.search(r'(20\d{6})', line)
        if date_match:
            record['period_end_date_raw'] = date_match.group(1)
    
    # Extract 4 subtotal amounts (before EUR/EUREUR)
    # Pattern: "0000000652000-0000003911999-0000000652000-0000003911999-"
    amounts_match = re.search(r'([0-9]{13,}[-+][0-9]{13,}[-+][0-9]{13,}[-+][0-9]{13,}[-+])', line)
    if amounts_match:
        amounts_str = amounts_match.group(1)
        # Split by dash/plus to get individual amounts
        amounts = re.split(r'[-+]', amounts_str)
        amounts = [a.strip() for a in amounts if a.strip() and len(a.strip()) >= 10]
        for i, amt in enumerate(amounts[:4], 1):
            record[f'subtotal_{i}_raw'] = amt
    
    # Extract currencies
    if 'EUREUR' in line:
        record['currency_1'] = 'EUR'
        record['currency_2'] = 'EUR'
    elif 'EUR' in line:
        record['currency_1'] = 'EUR'
    
    return record


def determine_br_type(line):
    """Determine if BR line is AGGREGATED or DETAILED."""
    if '00TFTOTAL' in line and 'EURC' in line and '00000000 000000' in line:
        return 'AGGREGATED'
    elif ('EURD' in line and 
          re.search(r'[A-Z]{2,}\s+[A-Z]{2,}', line) and  # City pattern
          re.search(r'[A-Z]{2}-\d{3}-[A-Z]{2}', line)):  # License plate pattern
        return 'DETAILED'
    else:
        # Default based on EURC/EURD
        if 'EURC' in line:
            return 'AGGREGATED'
        elif 'EURD' in line:
            return 'DETAILED'
        return 'UNKNOWN'


def parse_br_line(line):
    """Parse a BR (transaction) line."""
    record = {
        'record_type': 'BR',
        'raw_line': line,
        'br_type': determine_br_type(line)
    }
    
    # BR K5166202TF724110        K5166202202511270000...
    # Extract card number (alphanumeric code like K5166202, before TF724110)
    card_match = re.search(r'BR\s+([A-Z]\d{7})', line)
    if card_match:
        card_number = card_match.group(1)
        record['card_number'] = card_number
    
    # Extract account ID (TF724110 pattern)
    account_match = re.search(r'(TF\d{6})', line)
    if account_match:
        record['account_id'] = account_match.group(1)
    
    # Extract product code and label
    # For aggregated: "VH024HUE Super 98 Sans PL"
    # For detailed: "AETJSJCW5Gazole Premier" (near the end, no space between code and label)
    # Stop before "VEHICULES", "CABINET", "CD3" or end of line
    product_match = re.search(r'(VH\d+[A-Z0-9]+)\s+([A-Za-z0-9\s\.\']+?)(?:\s+(?:VEHICULES|CABINET|CD3)|$)', line)
    if product_match:
        record['product_code'] = product_match.group(1)
        record['product_label'] = product_match.group(2).strip()
    else:
        # Try detailed line pattern (AET... codes, 8-10 chars, followed immediately by label)
        # Pattern: "AETJSJCW5Gazole Premier" - code is 8-10 uppercase alphanumeric, label starts with uppercase
        # Stop before "VEHICULES", "CABINET", "CD3" or end of line
        product_match = re.search(r'([A-Z]{7,10}[0-9]?)([A-Z][A-Za-z0-9\s\.\']+?)(?:\s+(?:VEHICULES|CABINET|CD3)|$)', line[-150:] if len(line) > 150 else line)
        if product_match:
            record['product_code'] = product_match.group(1)
            # Clean up the label: remove trailing spaces and any "CABINET" or "CD3" that might have been captured
            product_label = product_match.group(2).strip()
            # Remove "CABINET" or "CD3" if they're at the end
            product_label = re.sub(r'\s+(CABINET|CD3)\s*$', '', product_label, flags=re.IGNORECASE).strip()
            record['product_label'] = product_label
    
    # Extract currency marker (EURC or EURD)
    if 'EURC' in line:
        record['currency_marker'] = 'EURC'
    elif 'EURD' in line:
        record['currency_marker'] = 'EURD'
    
    # Extract unit price (price per liter) from the block before EURD
    # Pattern: "720015550000000000000+00000017950097+000000052-0223EURD"
    # The unit price is the second number after the classification code
    unit_price_match = re.search(r'(\d{15,20})\+([0-9]{14,15})\+', line)
    if unit_price_match:
        unit_price_raw = unit_price_match.group(2)
        record['unit_price_raw'] = unit_price_raw
        # Parse: "00000018640097" = 18640097 / 10000000 = 1.8640097€
        if len(unit_price_raw) >= 7:
            try:
                unit_price_cents = int(unit_price_raw)
                # Format: last 7 digits are decimals (1.8640097€ = 18640097 / 10000000)
                record['unit_price_euros'] = unit_price_cents / 10000000.0
            except ValueError:
                pass
    
    # Extract date and time from the line
    # Pattern: "20251118174964" => "2025-11-18 17:49" + department "64"
    # Structure: YYYY (4) + MM (2) + DD (2) + HH (2) + MM (2) + department (2) = 14 digits total
    # Look for: 14 digits starting with "20" (year) where last 2 digits are department
    date_time_match = re.search(r'(20\d{10})(\d{2})\s+[A-Z]{2,}', line)
    if date_time_match:
        date_time_raw = date_time_match.group(1)  # "202511181749" (12 digits: YYYYMMDDHHMM)
        department = date_time_match.group(2)  # "64" (2 digits: department)
        record['date_time_raw'] = date_time_raw + department  # Full 14-digit string
        record['department'] = department
        
        # Parse date: YYYYMMDDHHMM => "2025-11-18 17:49"
        if len(date_time_raw) == 12:
            try:
                year = date_time_raw[0:4]   # 2025
                month = date_time_raw[4:6]  # 11
                day = date_time_raw[6:8]    # 18
                hour = date_time_raw[8:10]  # 17
                minute = date_time_raw[10:12]  # 49
                record['date_time'] = f"{year}-{month}-{day} {hour}:{minute}"
                record['date'] = f"{year}-{month}-{day}"
                record['time'] = f"{hour}:{minute}"
            except (ValueError, IndexError):
                pass
    
    # Extract amounts block (4 large amounts + trailing code before EUR)
    # Pattern: "20000000000122350-0000000734098-0000000122350-0000000734098-250EUR"
    amounts_block_match = re.search(r'([0-9]{15,}[-+][0-9]{13,}[-+][0-9]{13,}[-+][0-9]{13,}[-+](\d+))\s*EUR', line)
    if amounts_block_match:
        amounts_block = amounts_block_match.group(1)
        trailing_code = amounts_block_match.group(2)
        record['amounts_block_raw'] = amounts_block
        record['trailing_code_raw'] = trailing_code
        
        # Split by dash/plus to get individual amounts (excluding trailing code)
        parts = re.split(r'[-+]', amounts_block)
        amounts = [p.strip() for p in parts if p.strip() and len(p.strip()) >= 10]
        
        # Remove trailing code if it's in the list
        if amounts and amounts[-1] == trailing_code:
            amounts = amounts[:-1]
        
        for i, amt in enumerate(amounts[:4], 1):
            cleaned_amt = amt.replace(' ', '')
            record[f'amount_{i}_raw'] = cleaned_amt
            # Parse to cents
            parsed = parse_amount(cleaned_amt)
            if parsed is not None:
                record[f'amount_{i}_cents'] = parsed
                record[f'amount_{i}_euros'] = parsed / 100.0
        
        # Identify the "Prix Plein" (full tank price) - usually amount_2 or amount_4
        # Pattern: "20000000000000448+0000000002687+0000000000448+0000000002687+250EUR"
        # amount_2 and amount_4 are often the same and represent the TTC (Prix Plein)
        if len(amounts) >= 2:
            # Check if amount_2 and amount_4 are the same (common pattern for TTC)
            if len(amounts) >= 4 and amounts[1] == amounts[3]:
                prix_plein_cents = parse_amount(amounts[1].replace(' ', ''))
                if prix_plein_cents:
                    record['prix_plein_cents'] = prix_plein_cents
                    record['prix_plein_euros'] = prix_plein_cents / 100.0
            else:
                # Use amount_2 as Prix Plein (usually the TTC)
                prix_plein_cents = parse_amount(amounts[1].replace(' ', '')) if len(amounts) > 1 else None
                if prix_plein_cents:
                    record['prix_plein_cents'] = prix_plein_cents
                    record['prix_plein_euros'] = prix_plein_cents / 100.0
        
        # Calculate volume: Volume = Prix Plein / Prix Unitaire
        if 'unit_price_euros' in record and record['unit_price_euros'] > 0:
            if 'prix_plein_euros' in record and record['prix_plein_euros']:
                record['volume_liters'] = record['prix_plein_euros'] / record['unit_price_euros']
    
    # Extract currency
    if 'EUR' in line[-10:]:
        record['currency'] = 'EUR'
    
    # AGGREGATED BR lines
    if record['br_type'] == 'AGGREGATED':
        # Station info (should be "00000000 000000")
        station_match = re.search(r'(00000000\s+000000)', line)
        if station_match:
            record['station_info_raw'] = station_match.group(1)
        
        # Header code (should be "00TFTOTAL")
        if '00TFTOTAL' in line:
            record['header_code_raw'] = '00TFTOTAL'
        
        # Classification code (long numeric block like "0001000000000000000")
        class_match = re.search(r'(0001000000000000000)', line)
        if class_match:
            record['classification_code'] = class_match.group(1)
    
    # DETAILED BR lines
    elif record['br_type'] == 'DETAILED':
        # Extract city name (uppercase, before license plate)
        # Pattern: "OLORON STE MARIE           EW-468-YK"
        city_match = re.search(r'([A-Z]{2,}(?:\s+[A-Z]{2,}(?:\s+[A-Z]{2,}(?:\s+[A-Z]{2,})?)?)?)\s{10,}([A-Z]{2}-\d{3}-[A-Z]{2})', line)
        if city_match:
            record['city'] = city_match.group(1).strip()
            record['license_plate'] = city_match.group(2)
        
        # Extract station header code (like "0322TFVSM", "03ACTFWFD")
        station_header_match = re.search(r'(\d{2,4}[A-Z]{0,5}TF[A-Z]{2,5})', line)
        if station_header_match:
            record['station_header_code'] = station_header_match.group(1)
        
        # Extract station block (like "TFVSM 3562A11062300000000000000000")
        station_block_match = re.search(r'(TF[A-Z]{2,5}\s+[A-Z0-9]{20,})', line)
        if station_block_match:
            record['station_block_raw'] = station_block_match.group(1)
        
        # Extract classification code (long numeric block, usually 18 digits, before EURD)
        # Look for pattern like "720030060000000000000" before "+00000018290097"
        class_match = re.search(r'(\d{15,20})\s*\+', line)
        if class_match:
            record['classification_code'] = class_match.group(1)
        
        # Extract vehicle group (VEHICULES GAZOLE, VEHICULES TOUS SUPER ET GPL, CABINET, CD3, etc.)
        # First try to find "VEHICULES [group]"
        vehicle_group_match = re.search(r'VEHICULES\s+([A-Z\s]+)', line)
        if vehicle_group_match:
            record['vehicle_group'] = vehicle_group_match.group(1).strip()
        else:
            # Check for standalone "CABINET" or "CD3" at the end of the line (after product label)
            # Pattern: lots of spaces followed by "CABINET" or "CD3" at the end
            cabinet_cd3_match = re.search(r'\s+(CABINET|CD3)\s*$', line, re.IGNORECASE)
            if cabinet_cd3_match:
                record['vehicle_group'] = cabinet_cd3_match.group(1).strip().upper()
    
    return record


def get_theoretical_consumption(fuel_type):
    """
    Determine theoretical fuel consumption (L/100km) based on fuel type.
    Values are for modern vehicles (2015+).
    """
    fuel_type_lower = fuel_type.lower()
    
    # Diesel/Gazole: 5.5-6.5 L/100km average (use 6.0 for modern vehicles)
    if any(term in fuel_type_lower for term in ['gazole', 'diesel', 'b10']):
        return 6.0
    
    # Essence (Sans Plomb 95/98, Super): 6.5-7.5 L/100km average (use 7.0 for modern vehicles)
    if any(term in fuel_type_lower for term in ['sans plomb', 'super', 'plomb']):
        return 7.0
    
    # Default fallback
    return 6.5


def generate_simplified_csv(br_records, output_file):
    """Generate a simplified CSV with only the requested columns."""
    simplified_records = []
    
    # Keywords to exclude (non-fuel products)
    exclude_keywords = ['lavage', 'lubrifiant', 'adblue', 'accessoires', 'parking', 'frais']
    
    for rec in br_records:
        # Only process DETAILED BR records
        if rec.get('br_type') != 'DETAILED':
            continue
        
        # Get fuel type
        fuel_type = rec.get('product_label', '').strip()
        
        # Skip if it's a non-fuel product (lavage, lubrifiant, etc.)
        fuel_type_lower = fuel_type.lower()
        if any(keyword in fuel_type_lower for keyword in exclude_keywords):
            continue
        
        # Round unit price to 3 decimal places (e.g., 1.8540097 -> 1.854)
        unit_price_euros = rec.get('unit_price_euros', '')
        if unit_price_euros and isinstance(unit_price_euros, (int, float)):
            unit_price_euros = round(unit_price_euros, 3)
        
        # Round volume to 2 decimal places (e.g., 47.40903636 -> 47.41)
        volume_liters = rec.get('volume_liters', '')
        if volume_liters and isinstance(volume_liters, (int, float)):
            volume_liters = round(volume_liters, 2)
        
        # Get theoretical consumption based on fuel type
        consumption_theoretical = get_theoretical_consumption(fuel_type)
        
        simplified = {
            'date_time': rec.get('date_time', ''),
            'department': rec.get('department', ''),
            'city': rec.get('city', ''),
            'license_plate': rec.get('license_plate', ''),
            'fuel_type': fuel_type,  # Carburant
            'vehicle_group': rec.get('vehicle_group', ''),
            'unit_price_euros': unit_price_euros,
            'prix_plein_euros': rec.get('prix_plein_euros', ''),
            'volume_liters': volume_liters,
            'consumption_theoretical': consumption_theoretical
        }
        
        simplified_records.append(simplified)
    
    # Sort by license plate and date to calculate km since last fill-up
    # Parse date_time for sorting: "2025-11-18 17:49" -> datetime
    def parse_date_for_sort(record):
        date_str = record.get('date_time', '')
        if not date_str:
            return datetime.min
        try:
            # Handle both formats: "2025-11-18 17:49" and "11/18/2025 17:49"
            if '/' in date_str:
                # Format: "11/18/2025 17:49"
                parts = date_str.split()
                date_part = parts[0]  # "11/18/2025"
                time_part = parts[1] if len(parts) > 1 else "00:00"  # "17:49"
                month, day, year = date_part.split('/')
                return datetime(int(year), int(month), int(day), 
                              int(time_part.split(':')[0]), int(time_part.split(':')[1]) if ':' in time_part else 0)
            else:
                # Format: "2025-11-18 17:49"
                return datetime.strptime(date_str, '%Y-%m-%d %H:%M')
        except:
            return datetime.min
    
    # Sort by license plate (empty plates last) and then by date
    simplified_records.sort(key=lambda x: (
        x.get('license_plate', '') or 'ZZZ-ZZZ-ZZ',  # Empty plates go last
        parse_date_for_sort(x)
    ))
    
    # Calculate km since last fill-up for each vehicle
    vehicle_last_fillup = {}  # Track last fill-up date and km for each vehicle
    
    for record in simplified_records:
        license_plate = record.get('license_plate', '')
        volume_liters = record.get('volume_liters', '')
        consumption_theoretical = record.get('consumption_theoretical', 6.5)
        
        # Calculate km for this fill-up: km = (volume_liters / consumption_L_per_100km) * 100
        if volume_liters and isinstance(volume_liters, (int, float)) and volume_liters > 0:
            km_since_last_fillup = (volume_liters / consumption_theoretical) * 100
            km_since_last_fillup = round(km_since_last_fillup, 1)
        else:
            km_since_last_fillup = ''
        
        # Store km for next calculation (if same vehicle)
        if license_plate:
            vehicle_last_fillup[license_plate] = {
                'date': parse_date_for_sort(record),
                'km': km_since_last_fillup
            }
        
        record['km_theoretical'] = km_since_last_fillup
    
    # Write simplified CSV
    if simplified_records:
        fieldnames = ['date_time', 'department', 'city', 'license_plate', 'fuel_type', 
                     'vehicle_group', 'unit_price_euros', 'prix_plein_euros', 'volume_liters',
                     'consumption_theoretical', 'km_theoretical']
        
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=',')
            writer.writeheader()
            for rec in simplified_records:
                writer.writerow(rec)
        
        print(f"Generated simplified CSV: {output_file} with {len(simplified_records)} records")
    
    return len(simplified_records)


def parse_file(input_file, output_dir):
    """Parse the TotalEnergies file and generate CSV outputs."""
    ba_records = []
    bj_records = []
    br_records = []
    
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line_num, line in enumerate(f, 1):
            line = line.rstrip('\n\r')
            if not line.strip():
                continue
            
            record_type = line[:2] if len(line) >= 2 else ''
            
            if record_type == 'BA':
                try:
                    ba_records.append(parse_ba_line(line))
                except Exception as e:
                    print(f"Error parsing BA line {line_num}: {e}", file=sys.stderr)
            
            elif record_type == 'BJ':
                try:
                    bj_records.append(parse_bj_line(line))
                except Exception as e:
                    print(f"Error parsing BJ line {line_num}: {e}", file=sys.stderr)
            
            elif record_type == 'BR':
                try:
                    br_records.append(parse_br_line(line))
                except Exception as e:
                    print(f"Error parsing BR line {line_num}: {e}", file=sys.stderr)
    
    # Write BA table
    if ba_records:
        ba_file = Path(output_dir) / 'BA_TABLE.csv'
        with open(ba_file, 'w', newline='', encoding='utf-8') as f:
            # Get all unique keys from all records
            fieldnames = set()
            for rec in ba_records:
                fieldnames.update(rec.keys())
            fieldnames = sorted(fieldnames)
            
            writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=',')
            writer.writeheader()
            for rec in ba_records:
                writer.writerow(rec)
        print(f"Generated {ba_file} with {len(ba_records)} records")
    
    # Write BJ table
    if bj_records:
        bj_file = Path(output_dir) / 'BJ_TABLE.csv'
        with open(bj_file, 'w', newline='', encoding='utf-8') as f:
            fieldnames = set()
            for rec in bj_records:
                fieldnames.update(rec.keys())
            fieldnames = sorted(fieldnames)
            
            writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=',')
            writer.writeheader()
            for rec in bj_records:
                writer.writerow(rec)
        print(f"Generated {bj_file} with {len(bj_records)} records")
    
    # Write BR table
    if br_records:
        br_file = Path(output_dir) / 'BR_TABLE.csv'
        with open(br_file, 'w', newline='', encoding='utf-8') as f:
            fieldnames = set()
            for rec in br_records:
                fieldnames.update(rec.keys())
            fieldnames = sorted(fieldnames)
            
            writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=',')
            writer.writeheader()
            for rec in br_records:
                writer.writerow(rec)
        print(f"Generated {br_file} with {len(br_records)} records")
    
    return len(ba_records), len(bj_records), len(br_records)


if __name__ == '__main__':
    input_file = Path(__file__).parent.parent / 'TF724110_TI520251101.txt'
    output_dir = Path(__file__).parent.parent / 'parsed_data'
    
    if not input_file.exists():
        print(f"Error: Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)
    
    output_dir.mkdir(exist_ok=True)
    
    print(f"Parsing {input_file}...")
    ba_count, bj_count, br_count = parse_file(input_file, output_dir)
    print(f"\nSummary:")
    print(f"  BA records: {ba_count}")
    print(f"  BJ records: {bj_count}")
    print(f"  BR records: {br_count}")
    
    # Generate simplified CSV for detailed transactions
    print(f"\nGenerating simplified CSV...")
    br_file = output_dir / 'BR_TABLE.csv'
    if br_file.exists():
        # Re-read BR records to generate simplified version
        br_records = []
        with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
            for line in f:
                line = line.rstrip('\n\r')
                if line.startswith('BR '):
                    try:
                        br_records.append(parse_br_line(line))
                    except Exception as e:
                        pass
        
        simplified_file = output_dir / 'TRANSACTIONS_SIMPLIFIED.csv'
        simplified_count = generate_simplified_csv(br_records, simplified_file)
        print(f"  Simplified transactions: {simplified_count}")

