// src/hooks/useAddList.ts

import { useState } from 'react';
import { addList } from '../../indexdb/dbOperations';

export const useAddList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const insertList = async (list: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await addList(list);
      setSuccess(true);
    } catch (err) {
      setError('Error inserting list');
    } finally {
      setLoading(false);
    }
  };

  return { insertList, loading, error, success };
};

