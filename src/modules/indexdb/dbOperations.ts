import { initDB } from "./db";

const addData = async (storeName: string, data: any[]) => {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await Promise.all(data.map((item) => store.add(item)));
  await tx.done;
};

const getData = async (storeName: string, key?: string) => {
  const db = await initDB();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const result = key ? await store.get(key) : await store.getAll();
  await tx.done;
  return result;
};

const getUserById = async (userId: string) => {
  return await getData("users", userId);
};

const getWorkspacesByIds = async (workspaceIds: string[]) => {
  const db = await initDB();
  const tx = db.transaction("workspaces", "readonly");
  const store = tx.objectStore("workspaces");
  const workspaces = await Promise.all(workspaceIds.map((id) => store.get(id)));
  await tx.done;
  return workspaces;
};

const getListsByBoardId = async (boardId: string, archived: boolean) => {
  const db = await initDB();
  const tx = db.transaction("lists", "readonly");
  const store = tx.objectStore("lists");
  const lists = await store.getAll();
  await tx.done;
  return lists.filter((list) => list.board_id === boardId && (archived === undefined || list.archived === archived));
};

const getBoardById = async (boardId: string) => {
  const db = await initDB();
  const tx = db.transaction("workspaces", "readonly");
  const store = tx.objectStore("workspaces");
  const workspaces = await store.getAll();
  await tx.done;

  for (const workspace of workspaces) {
    const board = workspace.boards.find((board: any) => board._id === boardId);
    if (board) {
      return board;
    }
  }

  return null;
};

const addList = async (list: any) => {
  await addData('lists', [list]);
};

const updateList = async (id: string, updates: Partial<any>) => {
  const db = await initDB();
  const tx = db.transaction('lists', 'readwrite');
  const store = tx.objectStore('lists');
  const list = await store.get(id);
  if (!list) {
    throw new Error(`List with id ${id} not found`);
  }
  const updatedList = { ...list, ...updates };
  await store.put(updatedList);
  await tx.done;
};

export {
  addData,
  getData,
  getUserById,
  getWorkspacesByIds,
  getListsByBoardId,
  getBoardById,
  addList,
  updateList
};
