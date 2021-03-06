import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchMovieStart, getSearchMovieSuccess } from '../Redux/modules/movie/seachmovie';
import { getSearchTVStart, getSearchTVSuccess } from '../Redux/modules/tv/searchTV';
import { RootState } from '../Redux/reducer';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const movieResults = useSelector((state: RootState) => state.searchMovie);
  const tvResults = useSelector((state: RootState) => state.searchTV);

  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searchTerm !== '') {
      searchByTerm(searchTerm);
    }
  };

  const updateTerm = (event: any) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(() => value);
  };

  const searchByTerm = async (term: string) => {
    dispatch(getSearchTVStart(term));
    dispatch(getSearchMovieStart(term));
  };

  useEffect(() => {
    return () => {
      dispatch(getSearchMovieSuccess([]));
      dispatch(getSearchTVSuccess([]));
    };
  }, [dispatch]);

  return {
    movieResults,
    tvResults,
    handleSubmit,
    updateTerm,
    searchTerm,
  };
};

export default useSearch;
