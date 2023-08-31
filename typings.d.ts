interface Board {
    columns: Map<TypeColumn, Column>
}

type TypeColumn = "pending" | "ongoing" | "done"

interface Column {
    id: TypeColumn,
    todos: Todo[]
}

interface Todo extends Model.Document {
    $id: string;
    $createdAt: string;
    title: string;
    status: TypeColumn;
    image?: Image;
}

interface Image {
    bucketId: string;
    fileId: string;
}

