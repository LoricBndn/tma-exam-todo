import { assertEquals, assertThrows } from "jsr:@std/assert";
import { TaskManager } from "../TaskManager.ts";

const TEST_DB = "./data/test_tasks.json";

function cleanup() {
  try {
    Deno.removeSync(TEST_DB);
  } catch (e) {
    console.error("Erreur lors du nettoyage : ", e);
  }
}

Deno.test("TaskManager - Cas nominal : Ajouter une tâche", () => {
  cleanup();
  const manager = new TaskManager(TEST_DB);
  const task = manager.addTask("Tâche test");

  assertEquals(task.title, "Tâche test");
  assertEquals(manager.listTasks().length, 1);
  assertEquals(task.completed, false);

  cleanup();
});

Deno.test("TaskManager - Cas d'erreur : Erreur ID inexistant", () => {
  cleanup();
  const manager = new TaskManager(TEST_DB);

  assertThrows(
    () => {
      manager.completeTask(999);
    },
    Error,
    "Erreur tâche 999 introuvable",
  );

  cleanup();
});
