import React, { useState, useEffect, useMemo } from 'react';
import { Film, Plus } from 'lucide-react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovieForm from './components/AddMovieForm';
import { Movie } from './types/Movie';
import { sampleMovies } from './data/sampleMovies';

function App() {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  // Generate unique ID for new movies
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add new movie
  const handleAddMovie = (movieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: generateId(),
    };
    setMovies(prev => [newMovie, ...prev]);
  };

  // Filter movies based on title and rating
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesRating = movie.rating >= ratingFilter;
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, ratingFilter]);

  // Clear all filters
  const handleClearFilters = () => {
    setTitleFilter('');
    setRatingFilter(0);
  };

  // Get statistics
  const stats = useMemo(() => {
    const totalMovies = movies.length;
    const averageRating = movies.length > 0 
      ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
      : '0';
    const highRatedMovies = movies.filter(movie => movie.rating >= 4).length;
    
    return {
      total: totalMovies,
      average: averageRating,
      highRated: highRatedMovies,
    };
  }, [movies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Film className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Movie Collection
                </h1>
                <p className="text-gray-600">
                  Discover and organize your favorite movies and TV shows
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-gray-600">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.average}</div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.highRated}</div>
                <div className="text-gray-600">4+ Stars</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Component */}
        <Filter
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          onTitleFilterChange={setTitleFilter}
          onRatingFilterChange={setRatingFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMovies.length} of {movies.length} movies
            {(titleFilter || ratingFilter > 0) && (
              <span className="text-blue-600 font-medium"> (filtered)</span>
            )}
          </p>
        </div>

        {/* Movie List */}
        <MovieList movies={filteredMovies} />

        {/* Add Movie Form */}
        <AddMovieForm onAddMovie={handleAddMovie} />
      </main>
    </div>
  );
}

export default App;