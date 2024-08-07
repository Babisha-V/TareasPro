import { Client, Account } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject('66b2fe0300271a366dd5'); // Your project ID

const account = new Account(client);
export default account;
