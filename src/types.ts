export interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export interface ITaskManager {
    addTask(title: string): Task;
    listTasks(): Task[];
    completeTask(id: number): boolean;
}