import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: process.env.DB_URL,
  storageBucket: process.env.STORAGE_BUCKET,
};

export const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);
