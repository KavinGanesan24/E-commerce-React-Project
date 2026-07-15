import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { MdShoppingCart, MdFavoriteBorder, MdSearch, MdClose, MdMenu } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";
import { setSearchTerm } from "./store/searchSlice";
import { ChevronDown } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const isAdmin = true; // later from login

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/Product");
    setSearchOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "linear-gradient(to right, #ffffff 0%, #faf5ff 100%)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        zIndex: 1000,
      }}
    >
      <Container>
        {/* ===== LOGO/BRAND ===== */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "26px",
            background: "linear-gradient(135deg, #6a0bad 0%, #ff3399 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "transform 0.3s ease",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          <span style={{ fontSize: "28px" }}>💜</span>
          Purplle
        </Navbar.Brand>

        {/* ===== MOBILE SEARCH ICON ===== */}
        <div
          className="d-lg-none"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            variant="light"
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              border: "none",
              background: "transparent",
              padding: "6px 12px",
              cursor: "pointer",
              color: "#6a0bad",
              fontSize: "20px",
            }}
          >
            {searchOpen ? <MdClose /> : <MdSearch />}
          </Button>
        </div>

        {/* ===== NAVBAR TOGGLE ===== */}
        <Navbar.Toggle
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          style={{
            border: "none",
            background: "transparent",
            color: "#6a0bad",
            fontSize: "24px",
            padding: "0",
          }}
        />

        <Navbar.Collapse>
          {/* ===== MOBILE SEARCH BAR ===== */}
          {searchOpen && (
            <Form
              className="w-100"
              onSubmit={handleSearchSubmit}
              style={{
                marginBottom: "12px",
                padding: "0 0 12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearch}
                  style={{
                    borderRadius: "8px",
                    border: "1.5px solid #ff3399",
                    padding: "8px 16px",
                    fontSize: "14px",
                  }}
                  autoFocus
                />
                <Button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #6a0bad 0%, #ff3399 100%)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    color: "white",
                  }}
                >
                  <MdSearch />
                </Button>
              </div>
            </Form>
          )}

          {/* ===== LEFT MENU ===== */}
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: isActive("/") ? "#ff3399" : "#333",
                fontWeight: isActive("/") ? "600" : "500",
                fontSize: "15px",
                transition: "all 0.3s ease",
                borderBottom: isActive("/") ? "2px solid #ff3399" : "2px solid transparent",
                paddingBottom: "4px",
                marginRight: "20px",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/")) {
                  e.target.style.color = "#ff3399";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/")) {
                  e.target.style.color = "#333";
                }
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Product"
              style={{
                color: isActive("/Product") ? "#ff3399" : "#333",
                fontWeight: isActive("/Product") ? "600" : "500",
                fontSize: "15px",
                transition: "all 0.3s ease",
                borderBottom: isActive("/Product") ? "2px solid #ff3399" : "2px solid transparent",
                paddingBottom: "4px",
                marginRight: "20px",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/Product")) {
                  e.target.style.color = "#ff3399";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/Product")) {
                  e.target.style.color = "#333";
                }
              }}
            >
              Products
            </Nav.Link>

            {/* ===== CATEGORIES DROPDOWN ===== */}
            <div style={{ position: "relative", display: "inline-block", marginRight: "20px" }}>
              <Nav.Link
                style={{
                  color: "#333",
                  fontWeight: "500",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "2px solid transparent",
                  paddingBottom: "4px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ff3399";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#333";
                }}
              >
                Categories
                <ChevronDown size={16} style={{ marginTop: "2px" }} />
              </Nav.Link>

              {/* Desktop Dropdown */}
              <div
                style={{
                  display: "none",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                  minWidth: "180px",
                  marginTop: "8px",
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.display = "block";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="dropdown-menu-hover"
              >
                {["Beauty", "Fashion", "Skincare", "Accessories"].map((cat, idx) => (
                  <Link
                    key={idx}
                    to="/Product"
                    onClick={() => dispatch(setSearchTerm(cat))}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      color: "#333",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f7f0fb";
                      e.target.style.borderLeftColor = "#ff3399";
                      e.target.style.color = "#ff3399";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeftColor = "transparent";
                      e.target.style.color = "#333";
                    }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {isAuthenticated && (
              <Nav.Link
                as={Link}
                to="/orders"
                style={{
                  color: isActive("/orders") ? "#ff3399" : "#333",
                  fontWeight: isActive("/orders") ? "600" : "500",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  borderBottom: isActive("/orders") ? "2px solid #ff3399" : "2px solid transparent",
                  paddingBottom: "4px",
                  marginRight: "20px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/orders")) {
                    e.target.style.color = "#ff3399";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/orders")) {
                    e.target.style.color = "#333";
                  }
                }}
              >
                Orders
              </Nav.Link>
            )}

            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/admin"
                style={{
                  color: isActive("/admin") ? "#ff3399" : "#333",
                  fontWeight: isActive("/admin") ? "600" : "500",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  borderBottom: isActive("/admin") ? "2px solid #ff3399" : "2px solid transparent",
                  paddingBottom: "4px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/admin")) {
                    e.target.style.color = "#ff3399";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/admin")) {
                    e.target.style.color = "#333";
                  }
                }}
              >
                Profile
              </Nav.Link>
            )}
          </Nav>

          {/* ===== DESKTOP SEARCH ===== */}
          <Form
            className="d-none d-lg-flex"
            onSubmit={handleSearchSubmit}
            style={{
              marginRight: "24px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearch}
                style={{
                  borderRadius: "8px",
                  border: "1.5px solid #e0e0e0",
                  padding: "8px 16px",
                  width: "300px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ff3399";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255, 52, 153, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
              />
              <Button
                type="submit"
                style={{
                  position: "absolute",
                  right: "6px",
                  background: "transparent",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                <MdSearch size={18} />
              </Button>
            </div>
          </Form>

          {/* ===== RIGHT ACTIONS ===== */}
          <div
            className="d-flex align-items-center"
            style={{
              gap: "12px",
              marginLeft: "auto",
            }}
          >
            {/* WISHLIST - Only show when authenticated */}
            {isAuthenticated && (
              <Button
                onClick={() => navigate("/WishList")}
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "1.5px solid #ff3399",
                  borderRadius: "8px",
                  color: "#ff3399",
                  padding: "8px 12px",
                  fontSize: "18px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff3399";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#ff3399";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <MdFavoriteBorder size={20} />
              </Button>
            )}

            {/* CART */}
            <Button
              onClick={() =>
                isAuthenticated ? navigate("/WishList") : navigate("/")
              }
              style={{
                position: "relative",
                background: "linear-gradient(135deg, #6a0bad 0%, #ff3399 100%)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                padding: "8px 12px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 52, 153, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <MdShoppingCart size={22} />

              {totalQuantity > 0 && (
                <Badge
                  bg="danger"
                  pill
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: "700",
                    minWidth: "24px",
                    textAlign: "center",
                    animation: "pulse 0.6s infinite",
                  }}
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </Badge>
              )}
            </Button>

            {/* AUTH BUTTON */}
            {!isAuthenticated ? (
              <Button
                onClick={() => navigate("/")}
                style={{
                  background: "white",
                  color: "#6a0bad",
                  border: "1.5px solid #6a0bad",
                  borderRadius: "8px",
                  fontWeight: "600",
                  padding: "8px 20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6a0bad";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#6a0bad";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Login In
              </Button>
            ) : (
              <Button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  color: "#e74c3c",
                  border: "1.5px solid #e74c3c",
                  borderRadius: "8px",
                  fontWeight: "600",
                  padding: "8px 20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e74c3c";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#e74c3c";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .dropdown-menu-hover:hover {
          display: block !important;
        }

        @media (max-width: 991px) {
          .dropdown-menu-hover {
            position: static !important;
            display: none !important;
            box-shadow: none !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </Navbar>
  );
}

export default NavBar;
