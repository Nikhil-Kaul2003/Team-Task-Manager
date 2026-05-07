"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [tasks, setTasks] = useState([]);

  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    title: "",
    dueDate: "",
  });

  async function fetchTasks() {

    try {

      const res = await fetch(
        "http://localhost:3000/api/tasks"
      );

      const data = await res.json();

      setTasks(data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    fetchTasks();

    const userRole = localStorage.getItem("role");

    setRole(userRole);

  }, []);

  async function createTask(e) {

    e.preventDefault();

    try {

      await fetch(
        "http://localhost:3000/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title: form.title,
            status: "TODO",
            dueDate: form.dueDate,
            userId: 1,
            projectId: 1,
          }),
        }
      );

      fetchTasks();

      setForm({
        title: "",
        dueDate: "",
      });

    } catch (error) {

      console.log(error);

    }
  }

  async function deleteTask(id) {

    try {

      await fetch(
        `http://localhost:3000/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  }

  async function markDone(id) {

    try {

      await fetch(
        `http://localhost:3000/api/tasks/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: "DONE",
          }),
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        padding: "40px 20px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >

        <div
          style={{
            background:
              "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3)",
            border:
              "1px solid rgba(255,255,255,0.2)",
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "40px",
              marginBottom: "30px",
            }}
          >
            Team Task Manager
          </h1>

          <form onSubmit={createTask}>

            <input
              type="text"
              placeholder="Enter task title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                background: "white",
                color: "black",
                position: "relative",
                zIndex: "10",
              }}
            />

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dueDate: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                background: "white",
                color: "black",
                position: "relative",
                zIndex: "10",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                background:
                  "linear-gradient(to right, #00c6ff, #0072ff)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Create Task
            </button>

          </form>

        </div>

        {tasks.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "20px",
            }}
          >
            No tasks available
          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task.id}
              style={{
                background:
                  "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                padding: "25px",
                marginBottom: "20px",
                color: "white",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3)",
                border:
                  "1px solid rgba(255,255,255,0.2)",
              }}
            >

              <h2
                style={{
                  marginBottom: "15px",
                  fontSize: "28px",
                }}
              >
                {task.title}
              </h2>

              <p>
                <strong>Status:</strong>{" "}
                {task.status}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Project:</strong>{" "}
                {task.project?.name}
              </p>

              <p
                style={{
                  color: "#ddd",
                  marginTop: "10px",
                }}
              >
                <strong>Role:</strong> {role}
              </p>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {role === "ADMIN" && (
                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  style={{
                    padding: "12px 20px",
                    background:
                      "linear-gradient(to right, #ff416c, #ff4b2b)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
                )}
                {role === "ADMIN" && (

                <button
                  onClick={() =>
                    markDone(task.id)
                  }
                  style={{
                    padding: "12px 20px",
                    background:
                      "linear-gradient(to right, #11998e, #38ef7d)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Mark Done
                </button>
                )}

                <button
                  onClick={() => {

                    localStorage.removeItem(
                      "token"
                    );

                    localStorage.removeItem(
                      "role"
                    );

                    window.location.href =
                      "/login";

                  }}
                  style={{
                    padding: "12px 20px",
                    background:
                      "linear-gradient(to right, #434343, #000000)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}