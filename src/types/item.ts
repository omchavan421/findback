export type ItemType = 'lost' | 'found';

export type ItemCategory =
  | 'ID Card'
  | 'Wallet'
  | 'Keys'
  | 'Electronics'
  | 'Books'
  | 'Documents'
  | 'Accessories'
  | 'Water Bottle'
  | 'Bag'
  | 'Other';

export type ItemStatus = 'open' | 'claimed' | 'resolved' | 'available' | 'handed_over';

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  actor?: string;
}

export interface Item {
  id: string;
  title: string;
  type: ItemType;
  category: ItemCategory;
  description: string;
  location: string;
  building?: string;
  date: string;
  time: string;
  status: ItemStatus;
  image: string;
  reportId: string;
  identifyingDetails: string;
  contactPreference: 'email' | 'phone' | 'campus_desk';
  contactValue?: string;
  reporterName?: string;
  reporterRole?: 'student' | 'faculty' | 'staff' | 'visitor';
  storageLocation?: string; // where item is kept if found, e.g. "Security Desk - Main Hall"
  timeline: TimelineEvent[];
  createdAt: string;
}

export interface ItemFilterState {
  search: string;
  category: string;
  location: string;
  status: string;
  sortBy: 'newest' | 'oldest' | 'name-asc' | 'name-desc';
}

export interface CreateReportDTO {
  type: ItemType;
  title: string;
  category: ItemCategory;
  description: string;
  location: string;
  building?: string;
  date: string;
  time: string;
  identifyingDetails: string;
  contactPreference: 'email' | 'phone' | 'campus_desk';
  contactValue?: string;
  reporterName?: string;
  image?: string;
}

export interface ClaimRequestDTO {
  itemId: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  studentId?: string;
  proofDescription: string;
  serialNumberOrDetail?: string;
}

export interface ReportIssueDTO {
  itemId: string;
  issueType: 'wrong_info' | 'already_resolved' | 'spam' | 'offensive' | 'other';
  comment: string;
  reportedByEmail?: string;
}
