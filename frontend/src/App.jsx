import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://employee-portal-backend-cs43.onrender.com/api/employees"
      );

      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.department || !form.salary) {
    setMessage("❌ Please fill all fields");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    setMessage("❌ Please enter a valid email address");
    return;
  }

  try {
    const response = await fetch(
      "https://employee-portal-backend-cs43.onrender.com/api/employees",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(`❌ ${data.error || "Failed to add employee"}`);
      return;
    }

    setMessage("✅ Employee added successfully");

    setForm({
      name: "",
      email: "",
      department: "",
      salary: "",
    });

    fetchEmployees();
  } catch (error) {
    console.error(error);
    setMessage("❌ Server error. Please try again.");
  }
};

  const editEmployee = (employee) => {
  setEditingId(employee.id);

  setForm({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    salary: employee.salary,
  });
};
const deleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `https://employee-portal-backend-cs43.onrender.com/api/employees/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(`❌ ${data.error || "Failed to delete employee"}`);
      return;
    }

    setMessage("✅ Employee deleted successfully");

    fetchEmployees();
  } catch (error) {
    console.error(error);
    setMessage("❌ Server error. Please try again.");
  }
};
const updateEmployee = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.department || !form.salary) {
    setMessage("❌ Please fill all fields");
    return;
  }

  try {
    const response = await fetch(
      `https://employee-portal-backend-cs43.onrender.com/api/employees/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(`❌ ${data.error || "Failed to update employee"}`);
      return;
    }

    setMessage("✅ Employee updated successfully");

    setEditingId(null);

    setForm({
      name: "",
      email: "",
      department: "",
      salary: "",
    });

    fetchEmployees();
  } catch (error) {
    console.error(error);
    setMessage("❌ Server error. Please try again.");
  }
};
  


  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Employee Portal</h1>
          <p>Manage your employees efficiently</p>
        </div>
      </div>
      <div className="stats">
  <div className="stat-card">
    <h3>Total Employees</h3>
    <p>{employees.length}</p>
  </div>

  <div className="stat-card">
    <h3>IT Employees</h3>
    <p>
      {employees.filter(
        (employee) => employee.department === "IT"
      ).length}
    </p>
  </div>

  <div className="stat-card">
    <h3>CSE Employees</h3>
    <p>
      {employees.filter(
        (employee) => employee.department === "CSE"
      ).length}
    </p>
  </div>

  <div className="stat-card">
    <h3>Average Salary</h3>
    <p>
      ₹
      {employees.length
        ? Math.round(
            employees.reduce(
              (total, employee) =>
                total + Number(employee.salary),
              0
            ) / employees.length
          )
        : 0}
    </p>
  </div>
</div>

      <div className="form-section">
        <h2>Add Employee</h2>
        {/* your existing form here */}
      </div>

      <form onSubmit={editingId ? updateEmployee : addEmployee}>
        <div className="search-section">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
        </select>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
          min = "1"
        />

        <button type="submit">
          {editingId ? "Update Employee" : "Add Employee"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                email: "",
                department: "",
                salary: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Employees</h2>

      {employees
      .filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((employee) =>
        department === "" || employee.department === department
      )
      .map((employee) => (
        <div className="employee-card" key={employee.id}>
          <h3>{employee.name}</h3>
          <p>Email: {employee.email}</p>
          <p>Department: {employee.department}</p>
          <p>Salary: ₹{employee.salary}</p>
          <button onClick={() => editEmployee(employee)}>Edit</button>
          <button onClick={() => deleteEmployee(employee.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
