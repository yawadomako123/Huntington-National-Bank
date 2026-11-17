export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "deposit" | "withdrawal";
  status?: "pending" | "posted";
  category?: string;
  balanceAfter?: number;
};

/** Headline balance of the primary current account. */
export const currentBalance = 25972.71;

/**
 * Transaction history (newest first). The net of these movements is chosen so
 * the running balance reconciles to `currentBalance` on the latest row.
 */
export const transactions: Transaction[] = [
  { id: "TRX-7731AQ90", date: "2026-07-25T08:30:00Z", description: "Salary - Absa Payroll", amount: 6500.00, type: "deposit", status: "posted", category: "Income" },
  { id: "TRX-6620BW12", date: "2026-07-24T19:14:00Z", description: "MoMo Send - Ama (0554****90)", amount: 250.00, type: "withdrawal", status: "posted", category: "Mobile Money" },
  { id: "TRX-5519CX34", date: "2026-07-24T13:05:00Z", description: "Shoprite Accra Mall", amount: 412.80, type: "withdrawal", status: "posted", category: "Shopping" },
  { id: "TRX-4418DY56", date: "2026-07-23T10:40:00Z", description: "MTN Data Bundle - 10GB", amount: 45.00, type: "withdrawal", status: "posted", category: "Data & Airtime" },
  { id: "TRX-3317EZ78", date: "2026-07-22T17:22:00Z", description: "ECG Prepaid - Meter 020****55", amount: 120.00, type: "withdrawal", status: "posted", category: "Bills & Utilities" },
  { id: "TRX-2216FA90", date: "2026-07-21T09:00:00Z", description: "Incoming Transfer - Kwame Mensah", amount: 1200.00, type: "deposit", status: "posted", category: "Transfer" },
  { id: "TRX-1115GB12", date: "2026-07-20T20:18:00Z", description: "Bolt Ride - Osu to Legon", amount: 38.00, type: "withdrawal", status: "posted", category: "Transport" },
  { id: "TRX-9914HC34", date: "2026-07-19T13:47:00Z", description: "KFC Oxford Street", amount: 96.50, type: "withdrawal", status: "posted", category: "Food & Dining" },
  { id: "TRX-8813ID56", date: "2026-07-18T08:12:00Z", description: "Airtime Top-up - MTN", amount: 20.00, type: "withdrawal", status: "posted", category: "Data & Airtime" },
  { id: "TRX-7712JE78", date: "2026-07-17T11:30:00Z", description: "MoMo Cash In - MTN 024****118", amount: 500.00, type: "deposit", status: "posted", category: "Mobile Money" },
  { id: "TRX-6611KF90", date: "2026-07-16T15:05:00Z", description: "Melcom Plus - Groceries", amount: 287.30, type: "withdrawal", status: "posted", category: "Shopping" },
  { id: "TRX-5510LG12", date: "2026-07-15T07:55:00Z", description: "DSTV Subscription - Compact Plus", amount: 445.00, type: "withdrawal", status: "posted", category: "Bills & Utilities" },
  { id: "TRX-4419MH34", date: "2026-07-14T18:40:00Z", description: "Uber - Night Market", amount: 52.00, type: "withdrawal", status: "posted", category: "Transport" },
  { id: "TRX-3318NI56", date: "2026-07-13T12:10:00Z", description: "Refund - Jumia Ghana", amount: 180.00, type: "deposit", status: "posted", category: "Refund" },
  { id: "TRX-2217OJ78", date: "2026-07-12T09:25:00Z", description: "Ghana Water - GWCL", amount: 95.00, type: "withdrawal", status: "posted", category: "Bills & Utilities" },
  { id: "TRX-1116PK90", date: "2026-07-11T13:50:00Z", description: "Papaye Fast Food", amount: 60.00, type: "withdrawal", status: "posted", category: "Food & Dining" },
];

/**
 * Annotate a newest-first transaction list with the running account balance
 * after each movement, so history reconciles to the current balance exactly.
 */
export function withRunningBalance(txs: Transaction[], endingBalance: number): Transaction[] {
  let running = endingBalance;
  return txs.map((tx) => {
    const annotated = { ...tx, balanceAfter: running };
    running = running - (tx.type === "deposit" ? tx.amount : -tx.amount);
    return annotated;
  });
}
