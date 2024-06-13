import { useState, useEffect } from 'react';
import { getListsByBoardId } from '../../indexdb/dbOperations';

const useListsByBoardId = (boardId: string) => {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const listsData = await getListsByBoardId(boardId);
        setLists(listsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [boardId]);

  return { lists, loading, error };
};

export default useListsByBoardId;
