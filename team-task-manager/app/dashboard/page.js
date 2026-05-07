"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    setRole(userRole);

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");

      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    if (!title || !dueDate) {
      alert("Fill all fields");
      return;
    }

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

      if (res.ok) {
        alert("Task created");

        setTitle("");
        setDueDate("");

        fetchTasks();
      } else {
        alert("Task creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markDone = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: "DONE",
        }),
      });

      if (res.ok) {
        fetchTasks();
      } else {
        alert("Failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchTasks();
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(to right, #0f172a, #1e3a8a)",
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        Team Task Manager
      </h1>

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "rgba(255,255,255,0.1)",
          padding: "25px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={createTask}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#0ea5e9",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Create Task
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "20px",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <h2>{task.title}</h2>

            <p>Status: {task.status}</p>

            <p>
              Due Date:{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <p>Role: {role}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => markDone(task.id)}
                style={{
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "10px",
                  background: "green",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Mark Done
              </button>

              {role === "ADMIN" && (
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "10px",
                    background: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: "40px",
          padding: "15px 25px",
          border: "none",
          borderRadius: "10px",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}