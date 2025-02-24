import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";

function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2, #6B8DD6)",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container className="py-5">
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} md={12} className="text-center text-lg-start">
            <h1 className="fw-bold mb-4">Welcome to JobPortal</h1>
            <p className="fs-5 mb-4">
              A platform where talent meets opportunity. JobPortal helps you find your dream job,  
              participate in hackathons, and get your projects verified through AI-driven analysis.
            </p>
            <div className="user-features mb-4">
              <h5 className="mb-3">🚀 Elevate Your Career Journey</h5>
              <div className="feature-item d-flex align-items-start mb-2">
                <span className="emoji me-2">🎯</span>
                <p className="mb-0">Find perfectly matched opportunities with our AI-powered job matching system</p>
              </div>
              <div className="feature-item d-flex align-items-start mb-2">
                <span className="emoji me-2">🏆</span>
                <p className="mb-0">Showcase your skills in exciting hackathons and real-world coding challenges</p>
              </div>
              <div className="feature-item d-flex align-items-start mb-2">
                <span className="emoji me-2">✅</span>
                <p className="mb-0">Get your projects verified through comprehensive code quality analysis</p>
              </div>
              <div className="feature-item d-flex align-items-start mb-2">
                <span className="emoji me-2">🔍</span>
                <p className="mb-0">Connect with top companies that value your specific coding expertise</p>
              </div>
            </div>
          </Col>

          {/* Right Side Image - Enlarged */}
          <Col lg={6} md={12} className="text-center mt-5 mt-lg-0">
            <div className="position-relative">
              <div className="position-absolute top-0 start-0 translate-middle-y bg-light text-primary rounded-pill px-3 py-1 d-none d-md-block" style={{ left: "10%", zIndex: 2 }}>
                <span>💼 10,000+ Jobs</span>
              </div>
              <div className="position-absolute bottom-0 end-0 translate-middle-y bg-light text-primary rounded-pill px-3 py-1 d-none d-md-block" style={{ right: "10%", zIndex: 2 }}>
                <span>👩‍💻 50,000+ Users</span>
              </div>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR31tNdeMkJVT1PdJYHspm74MnQCzGhVt1pYg&s"
                alt="Job Portal"
                fluid
                className="rounded-lg shadow-lg"
                style={{ 
                  width: "100%", 
                  maxWidth: "600px", 
                  height: "auto",
                  transform: "scale(1.1)",
                  filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.2))"
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;