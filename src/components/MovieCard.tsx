import React from 'react';
import { Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm font-semibold">
          {movie.rating}/5
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          {renderStars(movie.rating)}
          <span className="text-sm text-gray-600 ml-2">
            ({movie.rating}/5)
          </span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {movie.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Added recently</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>2h 30m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;