"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Transaction, transactions as initialTransactions } from "../data/mockData";

export type UserProfile = {
  fullName: string;
  firstName: string;
  initials: string;
  email: string;
  lastSignIn: string;
  memberSince: string;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  available: number;
  type: "checking" | "savings" | "credit";
  accountNumber: string;
  routingNumber: string;
  apy?: number;
  creditLimit?: number;
};

export type Card = {
  id: string;
  name: string;
  cardNumber: string;
  expiry: string;
  type: "debit" | "credit";
  isFrozen: boolean;
};

interface BankContextType {
  user: UserProfile;
  accounts: Account[];
  transactions: Transaction[];
  cards: Card[];
  transferFunds: (fromAccountId: string, toAccountId: string, amount: number, description: string) => void;
  payBill: (fromAccountId: string, biller: string, amount: number) => void;
  purchase: (fromAccountId: string, description: string, amount: number, category?: string) => void;
  toggleCardFreeze: (cardId: string) => void;
  depositCheck: (toAccountId: string, amount: number) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

const ADMIN_EMAIL = "yaw@absa.com";

const defaultUser: UserProfile = {
  fullName: "Yaw Mensah",
  firstName: "Yaw",
  initials: "YM",
  email: ADMIN_EMAIL,
  lastSignIn: "2026-07-13T21:42:00",
  memberSince: "2022",
};

const defaultAccounts: Account[] = [
  { id: "acc_1", name: "Current Account", balance: 25972.71, available: 25972.71, type: "checking", accountNumber: "0851140050", routingNumber: "ABSAGHAC" },
  { id: "acc_2", name: "Premier Savings", balance: 8450.00, available: 8450.00, type: "savings", accountNumber: "0851140077", routingNumber: "ABSAGHAC", apy: 4.2 },
];

const defaultCards: Card[] = [
  { id: "card_1", name: "Absa Visa Debit", cardNumber: "**** **** **** 1140", expiry: "09/28", type: "debit", isFrozen: false },
  { id: "card_2", name: "Absa Visa Signature", cardNumber: "**** **** **** 7705", expiry: "05/27", type: "credit", isFrozen: false },
];

export function BankProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const [cards, setCards] = useState<Card[]>(defaultCards);

  const [user, setUser] = useState<UserProfile>(defaultUser);

  React.useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.email === ADMIN_EMAIL) {
        setAccounts(defaultAccounts);
        setTransactions(initialTransactions);
        setCards(defaultCards);
        setUser(defaultUser);
      } else {
        const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "Guest";
        setAccounts([
          { id: "acc_1", name: session?.user?.name ? `${session.user.name.split(" ")[0]}'s Account` : "Personal Account", balance: 0, available: 0, type: "checking", accountNumber: "0000000000", routingNumber: "ABSAGHAC" }
        ]);
        setTransactions([]);
        setCards([]);
        setUser({
          ...defaultUser,
          fullName: session?.user?.name || "Guest",
          firstName: firstName,
          initials: session?.user?.name ? session.user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "G",
          email: session?.user?.email || "",
        });
      }
    }
  }, [session, status]);

  const transferFunds = (fromAccountId: string, toAccountId: string, amount: number, description: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromAccountId) return { ...acc, balance: acc.balance - amount, available: acc.available - amount };
      if (acc.id === toAccountId) return { ...acc, balance: acc.balance + amount, available: acc.available + amount };
      return acc;
    }));

    const generateTxId = () => "TRX-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    const newTx: Transaction = {
      id: generateTxId(),
      date: new Date().toISOString(),
      description: `Online Transfer: ${description}`,
      amount: amount,
      type: "withdrawal",
      status: "pending",
      category: "Transfer",
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const payBill = (fromAccountId: string, biller: string, amount: number) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromAccountId) return { ...acc, balance: acc.balance - amount, available: acc.available - amount };
      return acc;
    }));

    const generateTxId = () => "TRX-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    const newTx: Transaction = {
      id: generateTxId(),
      date: new Date().toISOString(),
      description: `Bill Pay: ${biller}`,
      amount: amount,
      type: "withdrawal",
      status: "pending",
      category: "Bills & Utilities",
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const purchase = (fromAccountId: string, description: string, amount: number, category: string = "Payment") => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromAccountId) return { ...acc, balance: acc.balance - amount, available: acc.available - amount };
      return acc;
    }));

    const generateTxId = () => "TRX-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    const newTx: Transaction = {
      id: generateTxId(),
      date: new Date().toISOString(),
      description,
      amount,
      type: "withdrawal",
      status: "pending",
      category,
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const toggleCardFreeze = (cardId: string) => {
    setCards(prev => prev.map(card =>
      card.id === cardId ? { ...card, isFrozen: !card.isFrozen } : card
    ));
  };

  const depositCheck = (toAccountId: string, amount: number) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === toAccountId) return { ...acc, balance: acc.balance + amount, available: acc.available + amount };
      return acc;
    }));

    const generateTxId = () => "TRX-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    const newTx: Transaction = {
      id: generateTxId(),
      date: new Date().toISOString(),
      description: `Mobile Check Deposit`,
      amount: amount,
      type: "deposit",
      status: "pending",
      category: "Deposit",
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <BankContext.Provider value={{ user, accounts, transactions, cards, transferFunds, payBill, purchase, toggleCardFreeze, depositCheck }}>
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
}
