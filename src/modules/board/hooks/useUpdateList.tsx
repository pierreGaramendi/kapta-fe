import { useState } from 'react';
import { updateList } from '../../indexdb/dbOperations';

const useUpdateList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const modifyList = async (id: string, updates: Partial<any>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updateList(id, updates);
      setSuccess(true);
    } catch (err) {
      setError('Error updating list');
    } finally {
      setLoading(false);
    }
  };

  return { modifyList, loading, error, success };
};

export default useUpdateList;
