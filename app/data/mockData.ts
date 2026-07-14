export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "deposit" | "withdrawal";
  status?: "pending" | "posted";
  category?: string;
};

export const currentBalance = 12450.75;

export const transactions: Transaction[] = [
  { id: "TRX-829A10X9B", date: "2026-07-12T10:00:00Z", description: "Wire Transfer - De Beers S.A.", amount: 250000.00, type: "withdrawal", status: "posted", category: "Inventory" },
  { id: "TRX-412C78L2Q", date: "2026-07-10T14:30:00Z", description: "Incoming Wire - VIP Client", amount: 85000.00, type: "deposit", status: "posted", category: "Sales" },
  { id: "TRX-195Z34K8R", date: "2026-07-08T09:15:00Z", description: "Brinks Armored Transport", amount: 4500.20, type: "withdrawal", status: "posted", category: "Logistics" },
  { id: "TRX-820F12N4M", date: "2026-07-05T18:45:00Z", description: "Incoming ACH - Custom Orders", amount: 124500.00, type: "deposit", status: "posted", category: "Sales" },
  { id: "TRX-741Q90V3E", date: "2026-07-02T12:00:00Z", description: "Retail Space Lease - 5th Ave", amount: 85000.00, type: "withdrawal", status: "posted", category: "Real Estate" },
  { id: "TRX-553W21Y7P", date: "2026-06-28T08:30:00Z", description: "Rolex SA Invoice #892", amount: 154000.00, type: "withdrawal", status: "posted", category: "Inventory" },
  { id: "TRX-308H88J1T", date: "2026-06-25T10:00:00Z", description: "Incoming Wire - Sotheby's Auction", amount: 1120000.00, type: "deposit", status: "posted", category: "Sales" },
  { id: "TRX-914L09D5F", date: "2026-06-22T19:20:00Z", description: "Insurance Premium - Lloyd's", amount: 42000.00, type: "withdrawal", status: "posted", category: "Insurance" },
  { id: "TRX-120P44M6G", date: "2026-06-20T11:00:00Z", description: "Diamond Cutters Guild", amount: 18500.50, type: "withdrawal", status: "posted", category: "Services" },
  { id: "TRX-639V71S2H", date: "2026-06-18T14:20:00Z", description: "Marketing & PR Agency", amount: 25000.00, type: "withdrawal", status: "posted", category: "Marketing" },
  { id: "TRX-447B30X9J", date: "2026-06-15T09:00:00Z", description: "GIA Certification Fees", amount: 12300.30, type: "withdrawal", status: "posted", category: "Certification" },
  { id: "TRX-882C15L4K", date: "2026-06-12T10:00:00Z", description: "Incoming Wire - Private Collector", amount: 450000.00, type: "deposit", status: "posted", category: "Sales" },
  { id: "TRX-201N86Z2W", date: "2026-06-10T19:45:00Z", description: "Boutique Design Consultants", amount: 35000.00, type: "withdrawal", status: "posted", category: "Services" },
  { id: "TRX-719R52F3Q", date: "2026-06-08T13:10:00Z", description: "Staff Payroll", amount: 122800.80, type: "withdrawal", status: "posted", category: "Payroll" },
  { id: "TRX-993T10H7Y", date: "2026-06-05T16:30:00Z", description: "Transfer from Savings", amount: 500000.00, type: "deposit", status: "posted", category: "Transfer" },
  { id: "TRX-510M48D1C", date: "2026-06-03T12:00:00Z", description: "Security Systems LLC", amount: 14500.00, type: "withdrawal", status: "posted", category: "Security" },
  { id: "TRX-284J93P5N", date: "2026-06-01T08:15:00Z", description: "Corporate Taxes", amount: 345500.50, type: "withdrawal", status: "posted", category: "Taxes" },
  { id: "TRX-605K22V8L", date: "2026-05-28T18:00:00Z", description: "Gold Bullion Supplier", amount: 180200.20, type: "withdrawal", status: "posted", category: "Inventory" },
];
