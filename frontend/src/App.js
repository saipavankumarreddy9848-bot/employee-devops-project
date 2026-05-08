import React, { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  // Backend API URL
  const API_URL = "/employees";
  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Add employee
  const addEmployee = async () => {
    if (!name || !company || !role) {
      alert("Please fill all fields");
      return;
    }

    const newEmployee = {
      name,
      company,
      role,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        setName("");
        setCompany("");
        setRole("");

        fetchEmployees();
      } else {
        alert("Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employee Management System</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />

        <button onClick={addEmployee} style={styles.button}>
          Add Employee
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.company}</td>
              <td>{emp.role}</td>

              <td>
                <button
                  onClick={() => deleteEmployee(emp.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    margin: "30px auto",
    fontFamily: "Arial",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },

  input: {
    padding: "10px",
    width: "220px",
  },

  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default App;
