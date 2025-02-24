// NavigationBar.jsx
import React, { useState, useEffect } from "react"; // Import useEffect
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { List, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount (e.g., from localStorage)
    const loggedIn = localStorage.getItem('isLoggedIn'); // Example using localStorage
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []); // Run once on mount

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login status from localStorage
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <Navbar
      expand="md"
      expanded={expanded}
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #4A00E0, #8E2DE2)",
        padding: "10px 20px",
        marginTop: "-15px",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkhX_0hRKgL6YEXanSour0bu4IFAK9Z0RhtA&s width=150px"
            alt="JobPortal Logo"
            width={40}
            height={40}
            className="me-2"
          />
          <span className="text-white fw-bold fs-4">JobPortal</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        >
          {expanded ? <X size={28} color="white" /> : <List size={28} color="white" />}
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white mx-3 fw-semibold">
              Home
            </Nav.Link>
            {isLoggedIn && ( // Conditionally render Student Profile link
              <Nav.Link as={Link} to="/studentprofile" className="text-white mx-3 fw-semibold">
                Student Profile
              </Nav.Link>
            )}
             {isLoggedIn && ( // Conditionally render Company Profile link
              <Nav.Link as={Link} to="/companyprofile" className="text-white mx-3 fw-semibold">
                Company Profile
              </Nav.Link>
            )}
          </Nav>

          {/* Login/Register Buttons or Logout Button */}
          <div className="d-flex gap-3">
            {!isLoggedIn ? ( // Show Login/Register if not logged in
              <>
                <Button variant="outline-light" className="fw-bold" as={Link} to="/login">
                  Login
                </Button>
                <Button variant="light" className="fw-bold" as={Link} to="/register">
                  Register
                </Button>
              </>
            ) : ( // Show Logout button if logged in
              <Button variant="light" className="fw-bold" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}