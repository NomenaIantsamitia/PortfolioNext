// types/client.ts

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    siret: string;
    status: 'actif' | 'inactif';
    invoicesCount: number;
    lastInvoiceDate: string; // Utiliser Date ou string pour la simplicité
  }