import { ensureDirSync } from "jsr:@std/fs";
import { dirname } from "jsr:@std/path";
import { ITaskManager, Task } from "./types.ts";

export class TaskManager implements ITaskManager {
  private tasks: Task[] = [];
  private filePath: string;

  constructor(filePath: string = "./data/tasks.json") {
    this.filePath = filePath;
    this.loadFromFile();
  }

  private loadFromFile(): void {
    try {
      ensureDirSync(dirname(this.filePath));
      const data = Deno.readTextFileSync(this.filePath);
      this.tasks = JSON.parse(data);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        this.tasks = [];
      } else {
        console.error("Erreur de lecture du fichier : ", error);
      }
    }
  }

  private saveToFile(): void {
    Deno.writeTextFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
  }

  addTask(title: string): Task {
    if (!title.trim()) {
      throw new Error("Le titre de la tâche ne peut pas être vide");
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
    this.saveToFile();
    return newTask;
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  completeTask(id: number): boolean {
    const task = this.tasks.find((task) => task.id == id);
    if (!task) {
      throw new Error(`Erreur tâche ${id} introuvable`);
    }

    task.completed = true;
    this.saveToFile();
    return true;
  }
}
