import { useState } from 'react';
import axios from 'axios';

// Define la interfaz para los datos que enviarás
interface PostData {
  title: string;
  body: string;
  userId: number;
}

// Define la interfaz para la respuesta que esperas
interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define el hook personalizado
const usePostData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponse | null>(null);

  const postData = async (postData: PostData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<PostResponse>(
        'https://jsonplaceholder.typicode.com/posts',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, error, data };
};

export default usePostData;