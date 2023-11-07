import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url:any, method:any, headers: any, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    const fetchData = async () => {
      try {
        const response = await axios({
          url,
          method,
          headers
          // You can add more headers here if needed
        });

        if (isMounted) {
          setData(response.data);
          setLoading(false);
          setError(null);
        }
      } catch (err:any) {
        if (isMounted) {
          setData(null);
          setLoading(false);
          setError(err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up on unmount
    };
  }, [url, method, headers, ...dependencies]);

  return { data, loading, error };
}

export default useFetch;
