import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Item, CreateReportDTO, ClaimRequestDTO, ReportIssueDTO } from '../types/item';
import { itemService } from '../services/itemService';

interface ItemContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
  refreshItems: () => Promise<void>;
  createReport: (dto: CreateReportDTO) => Promise<Item>;
  claimItem: (claim: ClaimRequestDTO) => Promise<{ success: boolean; message: string; claimId: string }>;
  reportIssue: (issue: ReportIssueDTO) => Promise<{ success: boolean; message: string }>;
  stats: {
    totalReported: number;
    totalResolved: number;
    activeLost: number;
    activeFound: number;
    recoveryRate: number;
  };
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalReported: 0,
    totalResolved: 0,
    activeLost: 0,
    activeFound: 0,
    recoveryRate: 0
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [all, statistics] = await Promise.all([
        itemService.getItems(),
        itemService.getStatistics()
      ]);
      setItems(all);
      setStats(statistics);
    } catch (err) {
      console.error('Error loading items:', err);
      setError('Unable to load items from storage.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createReport = async (dto: CreateReportDTO): Promise<Item> => {
    const created = await itemService.createReport(dto);
    await loadData();
    return created;
  };

  const claimItem = async (claim: ClaimRequestDTO) => {
    const res = await itemService.claimItem(claim);
    await loadData();
    return res;
  };

  const reportIssue = async (issue: ReportIssueDTO) => {
    return await itemService.reportIncorrectInfo(issue);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        loading,
        error,
        refreshItems: loadData,
        createReport,
        claimItem,
        reportIssue,
        stats
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = (): ItemContextType => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};
