"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");

      if (!res.ok) {
        console.log("Failed to fetch tasks");
        return;
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE TASK
  const createTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          dueDate,
        }),
      });

      if (!res.ok) {
        alert("Task creation failed");
        return;
      }

      setTitle("");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Error creating task");
    }
  };

  // MARK DONE
  const markDone = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
      });

      if (!res.ok) {
        alert("Failed to update");
        return;
      }

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Error updating task");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete");
        return;
      }

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Error deleting task");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 p-10">

      {/* CREATE TASK CARD */}
      <div className="max-w-xl mx-auto bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Team Task Manager
        </h1>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-lg mb-4 outline-none"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-4 rounded-lg mb-4 outline-none"
        />

        <button
          onClick={createTask}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition"
        >
          Create Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="max-w-xl mx-auto mt-10">

        {tasks.length === 0 ? (
          <p className="text-white text-center text-xl">
            No tasks available
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {task.title}
              </h2>

              <p className="text-white mb-2">
                Due Date:{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>

              <p className="text-white mb-4">
                Status: {task.status}
              </p>

              <div className="flex gap-4">

                <button
                  onClick={() => markDone(task.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Mark Done
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}

        {/* LOGOUT BUTTON */}
        <div className="text-center mt-8">
          <button
            onClick={logout}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}