import {useState, useEffect} from 'react';
import rest from '../api/rest';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    console.log(searchTerm);
    try {
      const response = await rest.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose',
        },
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went Wrong!');
    }
  };
  useEffect(() => {
    searchApi('beep');
  }, []);
  return [searchApi, results, errorMessage];
};
