"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Dashboard</h1>

      <p>Total Tasks: {data.total}</p>
      <p>Completed Tasks: {data.completed}</p>
      <p>Pending Tasks: {data.pending}</p>
      <p>Overdue Tasks: {data.overdue}</p>
    </div>
  );
}