import { useEffect, useState } from "react";

function useFetch(url) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Data Not Found");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, [url]);

  return {
    products,
    error,
    isLoading,
    setProducts,
  };
}

export default useFetch;