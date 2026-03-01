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

  const isAuthenticated = useSelector(
    state => state.auth.isAuthenticated
  );

  const totalQuantity = useSelector(
    state => state.cart.totalQuantity
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Signup");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >
      <Container>

        {/* ===== LOGO ===== */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#6a1b9a",
            fontWeight: "bold",
            fontSize: "26px"
          }}
        >
          💜 Purplle
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* ===== LEFT NAV ===== */}
          <Nav className="me-auto">

            <Nav.Link
              as={Link}
              to="/"
              style={{ fontWeight: 500 }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Product"
              style={{ fontWeight: 500 }}
            >
              Products
            </Nav.Link>

            {isAuthenticated && (
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
            )}

          </Nav>

          {/* ===== SEARCH BAR ===== */}
          <Form
            className="mx-auto"
            style={{ width: "45%" }}
          >
            <Form.Control
              type="search"
              placeholder="Search beauty products..."
              style={{
                borderRadius: "25px",
                padding: "10px 20px"
              }}
              onChange={(e) =>
                dispatch(setSearchTerm(e.target.value))
              }
            />
          </Form>

          {/* ===== RIGHT SIDE ===== */}
          <div className="d-flex align-items-center gap-3">

            {/* LOGIN / LOGOUT */}
            {!isAuthenticated ? (
              <Button
                style={{
                  backgroundColor: "#6a1b9a",
                  border: "none"
                }}
                onClick={() => navigate("/Signup")}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="outline-danger"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

            {/* CART */}
            <Button
              style={{
                backgroundColor: "#ff4da6",
                border: "none",
                position: "relative"
              }}
              onClick={() =>
                isAuthenticated
                  ? navigate("/WishList")
                  : navigate("/Signup")
              }
            >
              <MdShoppingCart size={22} />

              {totalQuantity > 0 && (
                <Badge
                  bg="dark"
                  pill
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px"
                  }}
                >
                  {totalQuantity}
                </Badge>
              )}
            </Button>

          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;