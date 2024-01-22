import { ID, databases } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoDB: (todo: Todo, columnId: TypeColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;

  addTask: (todo: string, columnId: TypeColumn, createdBy: string) => void;

  deleteTask: (taskIndex: number, todoId: Todo, id: TypeColumn) => void;
  newTaskType: TypeColumn;
  setNewTaskType: (columnId: TypeColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypeColumn, Column>(),
  },

  searchString: "",
  newTaskInput: "",
  newTaskType: "pending",
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypeColumn) => {
    const newColumns = new Map(get().board.columns)
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id
    )
  },

  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  setNewTaskType: (columnId: TypeColumn) => set({ newTaskType: columnId }),

  updateTodoDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  addTask: async (todo: string, columnId: TypeColumn, createdBy: string) => {
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      { title: todo, status: columnId, createdBy: createdBy }
    );

    set({ newTaskInput: "" });
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        createdBy: createdBy,
      };

      const column = newColumns.get(columnId);

      if(!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        }
      }
    })
  },
}));
