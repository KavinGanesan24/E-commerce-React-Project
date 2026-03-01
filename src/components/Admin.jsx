import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/create")}>
        Create Product
      </button>

      <button onClick={() => navigate("/edit")}>
        Edit Products
      </button>

    </div>
  );
};

export default Admin;