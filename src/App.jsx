
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store student information
  const [students, setStudents] = useState([]);

  // Store form input
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
  });

  // Store search input
  const [search, setSearch] = useState("");

  // Welcome message
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    setWelcome("Welcome to the Student Management System!");
  }, []);

  // Capture input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Register a student
  function handleSubmit(event) {
    event.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...formData,
    };

    setStudents([...students, newStudent]);

    // Clear the form
    setFormData({
      name: "",
      age: "",
      email: "",
      course: "",
    });
  }

  // Delete a student
  function deleteStudent(id) {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  }

  // Search students by name
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        {welcome && <p className="welcome">{welcome}</p>}
      </header>

      <section className="card">
        <h2>Register Student</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Student Age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register Student
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Registered Students</h2>

        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <p>Total students: {students.length}</p>

        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="student-list">
            {filteredStudents.map((student) => (
              <div className="student" key={student.id}>
                <div>
                  <h3>{student.name}</h3>
                  <p>Age: {student.age}</p>
                  <p>Email: {student.email}</p>
                  <p>Course: {student.course}</p>
                </div>

                <button
                  type="button"
                  className="delete"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
