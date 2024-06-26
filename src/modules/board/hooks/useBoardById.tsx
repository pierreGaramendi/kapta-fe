import { useState, useEffect } from 'react';
import { Board } from '../../indexdb/kapta.model';
import { getBoardById } from '../../indexdb/dbOperations';
import { sampleBoardData } from '../../indexdb/initializeDB';


export const useBoardById = (boardId: string) => {
  const [board, setBoard] = useState<Board>(sampleBoardData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setLoading(true);
        const boardData = await getBoardById(boardId);
        if (boardData) {
          setBoard(boardData);
        } else {
          setError(`Board with ID ${boardId} not found.`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  return { board, loading, error };
};