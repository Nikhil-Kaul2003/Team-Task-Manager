"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {

        alert("Signup successful");

        router.push("/login");

      } else {

        alert(data.error || "Signup failed");
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #0f172a, #1e3a8a)",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={{
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          style={{
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          style={{
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
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
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
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
          Signup
        </button>
      </form>
    </div>
  );
}