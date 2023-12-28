import { databases } from "@/appwrite.js";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  const todos = data.documents;

  const columns = todos.reduce((acc: any, todo: any) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: todo.image }),
    });
    return acc;
  }, new Map<TypeColumn, Column>());

  // if no todo in column, add an empty todo

  const columnTypes: TypeColumn[] = ["pending", "ongoing", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }
  const sortColumns: Map<TypeColumn, Column> = new Map(
    [...columns.entries()].sort((a, b) => (
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    ))
)


  const board: Board = {
    columns: sortColumns
  }

  return board;
};
