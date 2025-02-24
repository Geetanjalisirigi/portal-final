import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { email, password };
      const url = userType === "student"
        ? "http://localhost:5000/apis/students/login"
        : "http://localhost:5000/apis/companies/login";

      const response = await axios.post(url, payload);

      alert("Login successful!");
      localStorage.setItem('isLoggedIn', 'true');

      if (userType === "student") {
        navigate("/studentprofile");
      } else {
        navigate("/companyprofile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-4 shadow-lg rounded-4" style={{ background: "white", border: "none" }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#4A00E0" }}>
                  Login to Your Account
                </h2>

                {error && <p className="text-danger text-center">{error}</p>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="userType" className="mb-3">
                    <Form.Label className="fw-semibold">Select Role</Form.Label>
                    <Form.Select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="rounded-3"
                    >
                      <option value="student">Student</option>
                      <option value="company">Company</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>


                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 fw-bold rounded-3"
                      style={{ backgroundColor: "#4A00E0", border: "none" }}
                    >
                      Login
                    </Button>
                  </motion.div>
                </Form>

                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary fw-semibold" style={{ textDecoration: "none" }}>
                    Sign Up
                  </Link>
                </p>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}