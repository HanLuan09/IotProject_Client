import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";

function SignOut() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      handleLogout();
    } else{
      navigate("/virtual-reality");
    }
  }, []); 

  const handleLogout = async () => {
    await setUser(null);
    localStorage.removeItem("user");
    navigate("/authentication/sign-in");
  };

  return null; // hoặc trả về JSX tương ứng cho component nếu cần
}

export default SignOut;
