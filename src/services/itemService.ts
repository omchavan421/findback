import { Item, ItemFilterState, CreateReportDTO, ClaimRequestDTO, ReportIssueDTO } from '../types/item';
import { INITIAL_MOCK_ITEMS } from '../data/mockItems';

const STORAGE_KEY = 'findback_campus_items_v1';

// Helper to access and initialize mock persistence in localStorage
const getStoredItems = (): Item[] => {
  if (typeof window === 'undefined') return INITIAL_MOCK_ITEMS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ITEMS));
      return INITIAL_MOCK_ITEMS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load items from localStorage:', err);
    return INITIAL_MOCK_ITEMS;
  }
};

const saveStoredItems = (items: Item[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save items to localStorage:', err);
  }
};

/**
 * Service layer for FINDBack
 * Designed with standard async Promises for frictionless migration to Supabase or backend API.
 */
export const itemService = {
  /**
   * Fetch all items with optional filters
   */
  async getItems(filters?: Partial<ItemFilterState>): Promise<Item[]> {
    // Simulate brief network delay for realistic UX states
    await new Promise((resolve) => setTimeout(resolve, 80));
    let items = getStoredItems();

    if (!filters) return items;

    const { search, category, location, status, sortBy } = filters;

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.reportId.toLowerCase().includes(q) ||
          item.identifyingDetails.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All' && category !== '') {
      items = items.filter((item) => item.category === category);
    }

    if (location && location !== 'All' && location !== 'All Campus Locations' && location !== '') {
      items = items.filter((item) =>
        item.location.toLowerCase().includes(location.toLowerCase()) ||
        (item.building && item.building.toLowerCase().includes(location.toLowerCase()))
      );
    }

    if (status && status !== 'All' && status !== '') {
      items = items.filter((item) => item.status === status);
    }

    if (sortBy) {
      items = [...items].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'name-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'name-desc') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
    }

    return items;
  },

  /**
   * Fetch items by type ('lost' | 'found')
   */
  async getItemsByType(type: 'lost' | 'found', filters?: Partial<ItemFilterState>): Promise<Item[]> {
    const all = await this.getItems(filters);
    return all.filter((item) => item.type === type);
  },

  /**
   * Fetch a single item by its unique ID
   */
  async getItemById(id: string): Promise<Item | null> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const items = getStoredItems();
    return items.find((i) => i.id === id) || null;
  },

  /**
   * Fetch a single item by human-friendly report ID (e.g. FND-2026-8491)
   */
  async getItemByReportId(reportId: string): Promise<Item | null> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const items = getStoredItems();
    return items.find((i) => i.reportId.toLowerCase() === reportId.toLowerCase()) || null;
  },

  /**
   * Submit a new Lost or Found item report
   */
  async createReport(dto: CreateReportDTO): Promise<Item> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const items = getStoredItems();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = dto.type === 'lost' ? 'LST' : 'FND';
    const reportId = `${prefix}-${new Date().getFullYear()}-${randomSuffix}`;
    const id = `item-${Date.now()}`;

    // Fallback placeholder image matching category if none uploaded
    const defaultImages: Record<string, string> = {
      'ID Card': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'Wallet': 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'Keys': 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
      'Electronics': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'Books': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'Documents': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      'Accessories': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'Water Bottle': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      'Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'Other': 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=800&q=80'
    };

    const newItem: Item = {
      id,
      title: dto.title,
      type: dto.type,
      category: dto.category,
      description: dto.description,
      location: dto.location,
      building: dto.building || 'Campus General',
      date: dto.date,
      time: dto.time,
      status: dto.type === 'lost' ? 'open' : 'available',
      image: dto.image && dto.image.trim() !== '' ? dto.image : (defaultImages[dto.category] || defaultImages['Other']),
      reportId,
      identifyingDetails: dto.identifyingDetails,
      contactPreference: dto.contactPreference,
      contactValue: dto.contactValue,
      reporterName: dto.reporterName || 'Anonymous Student',
      reporterRole: 'student',
      storageLocation: dto.type === 'found' ? 'Campus Security & Information Desk' : undefined,
      timeline: [
        {
          id: `t-${Date.now()}`,
          date: dto.date,
          time: dto.time,
          title: dto.type === 'lost' ? 'Lost Report Filed' : 'Found Item Reported',
          description: `Report submitted via FINDBack web platform. Status set to ${dto.type === 'lost' ? 'Open' : 'Available'}.`,
          actor: dto.reporterName || 'Reporter'
        }
      ],
      createdAt: new Date().toISOString()
    };

    const updated = [newItem, ...items];
    saveStoredItems(updated);
    return newItem;
  },

  /**
   * Submit a claim request for a found item or recovery notice for a lost item
   */
  async claimItem(claim: ClaimRequestDTO): Promise<{ success: boolean; message: string; claimId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const items = getStoredItems();
    const itemIndex = items.findIndex((i) => i.id === claim.itemId);

    if (itemIndex === -1) {
      throw new Error('Item not found');
    }

    const item = items[itemIndex];
    const claimId = `CLM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newTimelineEvent = {
      id: `t-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Ownership Claim Submitted',
      description: `Claim ${claimId} filed by ${claim.claimantName}. Verification pending with campus administration.`,
      actor: claim.claimantName
    };

    const updatedItem: Item = {
      ...item,
      status: 'claimed',
      timeline: [...item.timeline, newTimelineEvent]
    };

    items[itemIndex] = updatedItem;
    saveStoredItems(items);

    return {
      success: true,
      message: `Your claim (${claimId}) has been successfully filed! The campus coordinator will review your verification details.`,
      claimId
    };
  },

  /**
   * Report incorrect information or duplicate report
   */
  async reportIncorrectInfo(report: ReportIssueDTO): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    // In mock mode, log report and return confirmation
    console.info('Report Issue Logged:', report);
    return {
      success: true,
      message: 'Thank you for reporting this issue. Our campus moderation team has been alerted.'
    };
  },

  /**
   * Platform statistics for Hero / Dashboard
   */
  async getStatistics(): Promise<{
    totalReported: number;
    totalResolved: number;
    activeLost: number;
    activeFound: number;
    recoveryRate: number;
  }> {
    const items = getStoredItems();
    const totalReported = items.length;
    const totalResolved = items.filter((i) => i.status === 'resolved' || i.status === 'claimed').length;
    const activeLost = items.filter((i) => i.type === 'lost' && i.status === 'open').length;
    const activeFound = items.filter((i) => i.type === 'found' && i.status === 'available').length;
    const recoveryRate = Math.round((totalResolved / (totalReported || 1)) * 100);

    return {
      totalReported,
      totalResolved,
      activeLost,
      activeFound,
      recoveryRate
    };
  },

  /**
   * Reset local storage back to initial mock items
   */
  async resetToMockData(): Promise<void> {
    saveStoredItems(INITIAL_MOCK_ITEMS);
  }
};
