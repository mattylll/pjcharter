import path from 'path';
import { convertAllCsvToJson } from '../lib/utils/csvToJson';
import { getProcessors } from '../lib/utils/dataProcessors';

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
