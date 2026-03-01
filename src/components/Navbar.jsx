import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";
import { setSearchTerm } from "./store/searchSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

   const isAdmin = true; // later from login

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Signup");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "linear-gradient(to right,#ffffff,#faf5ff)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Container>
        {/* ===== BRAND ===== */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          💜 Purplle
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          {/* ===== LEFT MENU ===== */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Product">
              Products
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
            )}
            <Nav.Link>
              {isAdmin && <Link to="/admin">Profile</Link>}
            </Nav.Link>
           
            
          </Nav>

          {/* ===== SEARCH ===== */}
          <Form className="d-flex mx-auto" style={{ width: "40%" }}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </Form>

          {/* ===== RIGHT ACTIONS ===== */}
          <div className="d-flex align-items-center gap-3">
            {/* CART */}
            <Button
              variant="warning"
              style={{ position: "relative" }}
              onClick={() =>
                isAuthenticated ? navigate("/WishList") : navigate("/Signup")
              }
            >
              <MdShoppingCart size={22} />

              {totalQuantity > 0 && (
                <Badge
                  bg="danger"
                  pill
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                  }}
                >
                  {totalQuantity}
                </Badge>
              )}
            </Button>

            {/* AUTH BUTTON */}
            {!isAuthenticated ? (
              <Button variant="light" onClick={() => navigate("/Signup")}>
                Login
              </Button>
            ) : (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
