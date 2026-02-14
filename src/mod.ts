import { TaskManager } from "./TaskManager.ts";
import * as config from "../config.json" with { type: "json" };

if (import.meta.main) {
  const manager = new TaskManager(config.default.dbPath);

  console.log("Démarrage de l'applicatio ToDo List");

  try {
    console.log("\nAjout de tâches");
    manager.addTask("Réviser le Java");
    const t2 = manager.addTask("Créer le Git");
    manager.addTask("Finir le contrôle");

    console.log("\nListe des tâches");
    console.table(manager.listTasks());

    console.log(`\nComplétion de la tâche ${t2.id}`);
    manager.completeTask(t2.id);

    console.log("Etat final");
    console.table(manager.listTasks());
  } catch (e) {
    if (e instanceof Error) {
      console.error("Erreur : ", e.message);
    }
  }
}
