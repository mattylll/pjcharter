const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const fsExtra = require('fs-extra');

/**
 * Processes a comma-separated string into an array
 */
function processCommaSeparatedField(value) {
  if (!value) return [];
  return value.split(',').map((item) => item.trim());
}

/**
 * Processes a location row from CSV
 */
function processLocationRow(row) {
  return {
    ...row,
    popular_routes: processCommaSeparatedField(row.popular_routes),
    latitude: parseFloat(row.latitude),
    longitude: parseFloat(row.longitude),
  };
}

/**
 * Processes an aircraft row from CSV
 */
function processAircraftRow(row) {
  return {
    ...row,
    passenger_capacity: parseInt(row.passenger_capacity, 10),
    range_km: parseInt(row.range_km, 10),
    cruising_speed_kmh: parseInt(row.cruising_speed_kmh, 10),
    luggage_capacity_kg: parseInt(row.luggage_capacity_kg, 10),
    runway_requirement_m: parseInt(row.runway_requirement_m, 10),
    amenities: processCommaSeparatedField(row.amenities),
  };
}

/**
 * Processes a service row from CSV
 */
function processServiceRow(row) {
  return {
    ...row,
    benefits: processCommaSeparatedField(row.benefits),
    suitable_aircraft: processCommaSeparatedField(row.suitable_aircraft),
  };
}

/**
 * Processes a route row from CSV
 */
function processRouteRow(row) {
  return {
    ...row,
    distance_km: parseInt(row.distance_km, 10),
    flight_time_hours: parseFloat(row.flight_time_hours),
    popular_aircraft: processCommaSeparatedField(row.popular_aircraft),
  };
}

/**
 * Returns an object mapping file names to their processor functions
 */
function getProcessors() {
  return {
    locations: processLocationRow,
    aircraft: processAircraftRow,
    services: processServiceRow,
    routes: processRouteRow,
  };
}

/**
 * Converts a CSV file to JSON and saves it to the specified output path
 */
async function csvToJson(csvFilePath, jsonOutputPath, options = {}) {
  const { processRow = (row) => row } = options;
  const results = [];

  // Ensure the output directory exists
  await fsExtra.ensureDir(path.dirname(jsonOutputPath));

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Process each row with the provided function
        const processedRow = processRow(row);
        results.push(processedRow);
      })
      .on('end', () => {
        // Write the results to the JSON file
        fs.writeFile(jsonOutputPath, JSON.stringify(results, null, 2), (err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`✅ Converted ${csvFilePath} to ${jsonOutputPath}`);
            resolve();
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * Converts all CSV files in a directory to JSON
 */
async function convertAllCsvToJson(csvDir, jsonDir, processors = {}) {
  // Ensure the output directory exists
  await fsExtra.ensureDir(jsonDir);

  // Get all CSV files in the directory
  const files = await fsExtra.readdir(csvDir);
  const csvFiles = files.filter((file) => file.endsWith('.csv'));

  // Process each CSV file
  const conversions = csvFiles.map((file) => {
    const baseName = path.basename(file, '.csv');
    const csvFilePath = path.join(csvDir, file);
    const jsonFilePath = path.join(jsonDir, `${baseName}.json`);
    
    // Use the processor for this file if provided, otherwise use identity function
    const processor = processors[baseName] || ((row) => row);
    
    return csvToJson(csvFilePath, jsonFilePath, { processRow: processor });
  });

  await Promise.all(conversions);
  console.log(`✅ Converted ${csvFiles.length} CSV files to JSON`);
}

async function main() {
  try {
    console.log('🔄 Processing CSV data to JSON...');
    
    const csvDir = path.join(process.cwd(), 'data', 'csv');
    const jsonDir = path.join(process.cwd(), 'data', 'json');
    
    // Get processors for each file type
    const processors = getProcessors();
    
    // Convert all CSV files to JSON
    await convertAllCsvToJson(csvDir, jsonDir, processors);
    
    console.log('✅ All data processed successfully!');
  } catch (error) {
    console.error('❌ Error processing data:', error);
    process.exit(1);
  }
}

main();
