import React from 'react';
import { Search, Star, SlidersHorizontal } from 'lucide-react';

interface FilterProps {
  titleFilter: string;
  ratingFilter: number;
  onTitleFilterChange: (title: string) => void;
  onRatingFilterChange: (rating: number) => void;
  onClearFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  titleFilter,
  ratingFilter,
  onTitleFilterChange,
  onRatingFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filter Movies</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Title Filter */}
        <div className="relative">
          <label htmlFor="title-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Search by Title
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="title-filter"
              type="text"
              value={titleFilter}
              onChange={(e) => onTitleFilterChange(e.target.value)}
              placeholder="Enter movie title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={(e) => onRatingFilterChange(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
            >
              <option value={0}>All Ratings</option>
              <option value={1}>1+ Stars</option>
              <option value={2}>2+ Stars</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars Only</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(titleFilter || ratingFilter > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {titleFilter && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Title: "{titleFilter}"
              </span>
            )}
            {ratingFilter > 0 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                Rating: {ratingFilter}+ stars
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;