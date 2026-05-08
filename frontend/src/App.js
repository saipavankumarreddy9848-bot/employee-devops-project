import React, { useEffect, useState } from "react";

function App() {

  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch("http://localhost:8080/employees");
    const data = await response.json();
    setEmployees(data);
  };

  const addEmployee = async () => {

    const employee = {
      name,
      company,
      role
    };

    await fetch("http://localhost:8080/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    });

    setName("");
    setCompany("");
    setRole("");

    fetchEmployees();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button onClick={addEmployee}>Add</button>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.company} - {emp.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
