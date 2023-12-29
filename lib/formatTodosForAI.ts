const formatTodosForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypeColumn]: Todo[] });

  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as TypeColumn] = {
        count: value.length,
        todos: value.map(todo => todo.title),
      };
      return map;
    },
    {} as { [key in TypeColumn]: { count: number; todos: string[] } }
  );

  return flatArrayCounted;
};

export default formatTodosForAI