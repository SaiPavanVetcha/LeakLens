import Papa from 'papaparse';
import { Product, Customer, Transaction, InventoryRecord, Campaign } from '@/types';

export async function fetchAndParseCSV<T>(url: string): Promise<T[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as T[]);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    });
  } catch (err) {
    console.error(`Error loading CSV from ${url}:`, err);
    throw err;
  }
}

export async function loadAllDatasets() {
  const [products, customers, transactions, inventory, campaigns] = await Promise.all([
    fetchAndParseCSV<Product>('/data/products.csv'),
    fetchAndParseCSV<Customer>('/data/customers.csv'),
    fetchAndParseCSV<Transaction>('/data/transactions.csv'),
    fetchAndParseCSV<InventoryRecord>('/data/inventory.csv'),
    fetchAndParseCSV<Campaign>('/data/campaigns.csv'),
  ]);

  return {
    products,
    customers,
    transactions,
    inventory,
    campaigns,
  };
}
