import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OAuth2Success() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/me", { withCredentials: true }) // Optional: withCredentials
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch((err) => {
        console.error("OAuth login failed", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h2>Signing in with Google...</h2>
    </div>
  );
}

export default OAuth2Success;
