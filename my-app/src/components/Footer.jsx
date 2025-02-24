import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Brain, ShieldCheck, BarChart3, Mail, PhoneCall, Globe } from "lucide-react";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(120deg, #1e1e2e, #312e81)",
        color: "white",
        padding: "50px 0",
        marginTop: "40px",
        boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Features Section */}
      <Container className="mb-4">
        <Row className="text-center">
          <Col md={4} className="p-4">
            <Brain size={40} color="#facc15" />
            <h3 className="mt-2">AI-Powered Job Matching</h3>
            <p>
              Our smart system filters jobs based on skills and preferences using
              cutting-edge AI technology.
            </p>
          </Col>
          <Col md={4} className="p-4">
            <ShieldCheck size={40} color="#22c55e" />
            <h3 className="mt-2">Verified Companies</h3>
            <p>
              Only trusted companies can post jobs, ensuring **secure** and
              **quality** hires.
            </p>
          </Col>
          <Col md={4} className="p-4">
            <BarChart3 size={40} color="#3b82f6" />
            <h3 className="mt-2">Data-Driven Insights</h3>
            <p>
              Get **personalized job recommendations** and insights to make
              better career decisions.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Contact & Footer Section */}
      <Container className="text-center mt-4">
        <Row className="justify-content-center">
          <Col md={3} className="p-3">
            <Mail size={24} color="white" />
            <p className="mt-2">support@jobportal.com</p>
          </Col>
          <Col md={3} className="p-3">
            <PhoneCall size={24} color="white" />
            <p className="mt-2">+1 (555) 123-4567</p>
          </Col>
          <Col md={3} className="p-3">
            <Globe size={24} color="white" />
            <p className="mt-2">www.jobportal.com</p>
          </Col>
        </Row>

        {/* Copyright */}
        <p className="mt-4" style={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
