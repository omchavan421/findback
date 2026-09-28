import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PlusCircle, Search, ShieldCheck } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { ItemGrid } from '../components/ItemGrid';
import { Pagination } from '../components/Pagination';
import { Button } from '../components/Button';
import { ItemFilterState } from '../types/item';

const ITEMS_PER_PAGE = 6;

export const FoundItemsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, loading } = useItems();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('cat') || 'All';
  const locationParam = searchParams.get('loc') || 'All';

  const [filters, setFilters] = useState<ItemFilterState>({
    search: queryParam,
    category: categoryParam,
    location: locationParam,
    status: 'All',
    sortBy: 'newest'
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (queryParam || categoryParam !== 'All' || locationParam !== 'All') {
      setFilters((prev) => ({
        ...prev,
        search: queryParam || prev.search,
        category: categoryParam !== 'All' ? categoryParam : prev.category,
        location: locationParam !== 'All' ? locationParam : prev.location
      }));
    }
  }, [queryParam, categoryParam, locationParam]);

  const handleFilterChange = (updated: Partial<ItemFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      location: 'All',
      status: 'All',
      sortBy: 'newest'
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  // Filter found items
  const filteredItems = useMemo(() => {
    let result = items.filter((item) => item.type === 'found');

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.reportId.toLowerCase().includes(q) ||
          i.identifyingDetails.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'All') {
      result = result.filter((i) => i.category === filters.category);
    }

    if (filters.location && filters.location !== 'All') {
      result = result.filter(
        (i) =>
          i.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          (i.building && i.building.toLowerCase().includes(filters.location.toLowerCase()))
      );
    }

    if (filters.status && filters.status !== 'All') {
      result = result.filter((i) => i.status === filters.status);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (filters.sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return result;
  }, [items, filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Campus Custody & Recovered Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Found Items Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Belongings that have been secured by campus staff or handed in by fellow students. If one of these belongs to you, open the item to file your claim.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/report-found">
            <Button
              variant="primary"
              className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Report Found Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <SearchBar
          value={filters.search}
          onChange={(val) => handleFilterChange({ search: val })}
          placeholder="Search found items by description, building location, or report ID..."
        />

        <FilterBar
          type="found"
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          totalResults={filteredItems.length}
        />
      </div>

      {/* Item Grid */}
      <ItemGrid
        items={paginatedItems}
        isLoading={loading}
        emptyTitle="No found items match your criteria"
        emptyDescription="We couldn't find any found items with your active filters. Try searching for a different keyword or location."
        onResetFilters={handleResetFilters}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
