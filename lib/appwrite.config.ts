// import { Client, Databases, Account, Storage, Messaging } from "appwrite";
import { ID, Databases, Account, Storage, Messaging, Client, Users } from "node-appwrite";
export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  NEXT_PUBLIC_STORAGE_ID: BUCKET_ID,
  NEXT_PUBLIC_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID: PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_DOCTOR_COLLECTION_ID: DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID: APPOINTMENT_COLLECTION_ID,
} = process.env;

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('6850bc92002fe864954a')
  .setKey('standard_8b2ee28756963189c0647059d582877384654f681ca488f2466ff4b13e9341d08ba58735c85ec736e040e716f6e6af49f4f4f1574dafe2cb1802e706f463d2d7871434df2a84c226312be5c62e7e508a95ef4c0ef9ff0307dba1d7fad07df6b080cdddb2673953d98345e9dd5b427494d72995123bfc1e31321c7432189ed02b')


export const databases = new Databases(client);
export const users = new Users(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
