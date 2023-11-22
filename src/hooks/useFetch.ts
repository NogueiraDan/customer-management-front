import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Definição do tipo para os parâmetros da requisição
type RequestOptions = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE"; // Adicione outros métodos conforme necessário
  headers?: any; // Tipo genérico para os headers
  dependencies?: any[]; // Dependências para casos de useEffect com dependências
};

// Custom Hook para requisições HTTP genéricas
function useFetch({
  url,
  method,
  headers,
  dependencies = [],
}: RequestOptions): [any, boolean, Error | null] {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const config: AxiosRequestConfig = {
          method,
          url,
          headers,
        };

        const response: AxiosResponse = await axios(config);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies); // Se não houver dependências, não é necessário reexecutar a requisição

  return [data, isLoading, error];
}

export default useFetch;
