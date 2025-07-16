import React from 'react';
import { Film } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movie';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No movies found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or add some movies to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;