import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import fsExtra from 'fs-extra';

interface CsvToJsonOptions {
  processRow?: (row: any) => any;
}

/**
 * Converts a CSV file to JSON and saves it to the specified output path
 * @param csvFilePath Path to the CSV file
 * @param jsonOutputPath Path where the JSON file will be saved
 * @param options Additional options for processing
 * @returns Promise that resolves when the conversion is complete
 */
export async function csvToJson(
  csvFilePath: string,
  jsonOutputPath: string,
  options: CsvToJsonOptions = {}
): Promise<void> {
  const { processRow = (row) => row } = options;
  const results: any[] = [];

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
 * Processes a comma-separated string into an array
 * @param value Comma-separated string
 * @returns Array of trimmed strings
 */
export function processCommaSeparatedField(value: string): string[] {
  if (!value) return [];
  return value.split(',').map((item) => item.trim());
}

/**
 * Converts all CSV files in a directory to JSON
 * @param csvDir Directory containing CSV files
 * @param jsonDir Directory where JSON files will be saved
 * @param processors Object mapping file names to processor functions
 * @returns Promise that resolves when all conversions are complete
 */
export async function convertAllCsvToJson(
  csvDir: string,
  jsonDir: string,
  processors: Record<string, (row: any) => any> = {}
): Promise<void> {
  // Ensure the output directory exists
  await fsExtra.ensureDir(jsonDir);

  // Get all CSV files in the directory
  const files = await fsExtra.readdir(csvDir);
  const csvFiles = files.filter((file: string) => file.endsWith('.csv'));

  // Process each CSV file
  const conversions = csvFiles.map((file: string) => {
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
