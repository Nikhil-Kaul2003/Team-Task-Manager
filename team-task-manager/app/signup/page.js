"use client";

import { useState } from "react";

export default function SignupPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  async function handleSignup(e) {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Signup successful");

        window.location.href =
          "/login";

      } else {

        alert(data.error);

      }

    } catch (error) {

      console.log(error);

    }
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
          border:
            "1px solid rgba(255,255,255,0.2)",
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "36px",
          }}
        >
          Signup
        </h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
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
              background: "white",
              fontSize: "16px",
              color: "black",
              position: "relative",
              zIndex: "10",
              pointerEvents: "auto",
            }}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
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
              background: "white",
              fontSize: "16px",
              color: "black",
              position: "relative",
              zIndex: "10",
              pointerEvents: "auto",
            }}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
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
              background: "white",
              fontSize: "16px",
              color: "black",
              position: "relative",
              zIndex: "10",
              pointerEvents: "auto",
            }}
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              background: "white",
              fontSize: "16px",
              color: "black",
              position: "relative",
              zIndex: "10",
              pointerEvents: "auto",
            }}
          >
            <option value="MEMBER">
              Member
            </option>

            <option value="ADMIN">
              Admin
            </option>
          </select>

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
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}