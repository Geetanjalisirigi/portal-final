import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userType: "student", // Default role
    username: "",
    email: "",
    password: "",
    skills: "",
    education: "",
    projects: "",
    companyName: "",
    location: "",
    description: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userType, username, email, password, skills, education, projects, companyName, location, description, website } = formData;

      const payload =
        userType === "student"
          ? {
              userType,
              username,
              email,
              password,
              skills: skills.split(",").map((skill) => skill.trim()), // Convert comma-separated string to array
              education: education.split(",").map((edu) => edu.trim()), // Convert comma-separated string to array
              projects: projects.split(",").map((proj) => proj.trim()), // Convert comma-separated string to array
            }
          : { userType, email, password, companyName, location, description, website };

      const endpoint = userType === "student" ? "/apis/students/register" : "/apis/companies/register";
      await axios.post(`http://localhost:5000${endpoint}`, payload);

      alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} registered successfully`);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="p-4 shadow-lg rounded-4" style={{ background: "white", border: "none" }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#4A00E0" }}>
                  Create Your Account
                </h2>
                <Form onSubmit={handleSubmit}>
                  {/* User Type */}
                  <Form.Group controlId="userType" className="mb-3">
                    <Form.Label className="fw-semibold">User Type</Form.Label>
                    <Form.Select name="userType" value={formData.userType} onChange={handleChange} className="rounded-3">
                      <option value="student">Student</option>
                      <option value="company">Company</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Common Fields */}
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  {/* Student Fields */}
                  {formData.userType === "student" && (
                    <>
                      <Form.Group controlId="username" className="mb-3">
                        <Form.Label className="fw-semibold">Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Enter your username"
                          value={formData.username}
                          onChange={handleChange}
                          className="rounded-3"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="skills" className="mb-3">
                        <Form.Label className="fw-semibold">Skills</Form.Label>
                        <Form.Control
                          type="text"
                          name="skills"
                          placeholder="Enter skills (comma separated)"
                          value={formData.skills}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group controlId="education" className="mb-3">
                        <Form.Label className="fw-semibold">Education</Form.Label>
                        <Form.Control
                          type="text"
                          name="education"
                          placeholder="Enter education (comma separated)"
                          value={formData.education}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group controlId="projects" className="mb-3">
                        <Form.Label className="fw-semibold">Projects</Form.Label>
                        <Form.Control
                          type="text"
                          name="projects"
                          placeholder="Enter projects (comma separated)"
                          value={formData.projects}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </Form.Group>
                    </>
                  )}

                  {/* Company Fields */}
                  {formData.userType === "company" && (
                    <>
                      <Form.Group controlId="companyName" className="mb-3">
                        <Form.Label className="fw-semibold">Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="companyName"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="rounded-3"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="location" className="mb-3">
                        <Form.Label className="fw-semibold">Location</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          placeholder="Enter company location"
                          value={formData.location}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group controlId="description" className="mb-3">
                        <Form.Label className="fw-semibold">Company Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          rows={3}
                          placeholder="Enter a brief description of your company"
                          value={formData.description}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </Form.Group>

                      <Form.Group controlId="website" className="mb-3">
                        <Form.Label className="fw-semibold">Company Website</Form.Label>
                        <Form.Control
                          type="url"
                          name="website"
                          placeholder="Enter company website URL"
                          value={formData.website}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </Form.Group>
                    </>
                  )}

                  <Button type="submit" variant="primary" className="w-100 fw-bold rounded-3">
                    Register
                  </Button>
                </Form>
                <p className="text-center mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
