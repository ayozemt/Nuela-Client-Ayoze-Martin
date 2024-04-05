import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function VerticalNavbar() {
  return (
    <Navbar bg="white" expand="lg" className="flex-column">
      <Navbar.Brand className="py-5">
        <i className="bi bi-building px-2"></i>Tajamar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Item>
            <NavLink className="nav-link" to="/home">
              <i className="bi bi-house-door px-2"></i> Inicio
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/horarios">
              <i className="bi bi-clock px-2"></i> Horarios
            </NavLink>
          </Nav.Item>
          <Nav.Item className="">
            <NavLink className="nav-link" to="/">
              <i className="bi bi-person px-2"></i> Profesores
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/familias">
              <i className="bi bi-people px-2"></i> Familias
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/espacios">
              <i className="bi bi-box px-2"></i> Espacios
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/asignaturas">
              <i className="bi bi-book px-2"></i> Asignaturas
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/notificaciones">
              <i className="bi bi-bell px-2"></i> Notificaciones
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/settings">
              <i className="bi bi-gear px-2"></i> Settings
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default VerticalNavbar;
