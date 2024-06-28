import { useCallback } from 'react';
import { initDB } from '../../indexdb/db';

export const useInsertWorkspace = () => {
  const insertWorkspace = useCallback(async (userId: string, workspace: any) => {
    try {
      const db = await initDB();
      const tx = db.transaction(['users', 'workspaces'], 'readwrite');
      const usersStore = tx.objectStore('users');
      const workspacesStore = tx.objectStore('workspaces');

      // Obtener el usuario por su ID
      const user = await usersStore.get(userId);

      // Actualizar el arreglo de workspaces del usuario
      user.workspaces.push(workspace._id);
      await usersStore.put(user);

      // Insertar el nuevo workspace en la tienda 'workspaces'
      await workspacesStore.add(workspace);
      await tx.done;

      return { success: true, message: `Workspace ${workspace._id} added successfully` };
    } catch (error: any) {
      console.error('Error adding workspace', error);
      return { success: false, message: `Failed to add workspace: ${error.message}` };
    }
  }, []);

  return insertWorkspace;
};