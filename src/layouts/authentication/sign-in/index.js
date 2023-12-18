import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const navigate = useNavigate();

  
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    code: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user } = useAuth();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitFormData = (e) => {
    e.preventDefault();

    // Kiểm tra xem các trường dữ liệu có được nhập không
    if (!formData.code || !formData.password) {
      setError("Tên đăng nhập và mật khẩu không được để trống.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }
    setIsLoading(true);
    // Gọi API đăng nhập
    AuthApi.Login(formData)
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          setProfile(response);
        } else {
          setError("Tên đăng nhập hoặc mật khẩu không đúng");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setError(error.response.data.msg);
        } else {
          setError("Có lỗi xảy ra khi gửi yêu cầu.");
        }
      });
  };

  const setProfile = (response) => {
    let user = { ...response.data.name };
    user.name = response.data.name;
    user.token = response.data.token;
    user.isAdmin = response.data.isAdmin;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    navigate("/virtual-reality");
  };

  return (
    <CoverLayout title="Smart classroom" description="Nhập tên đăng nhập và mật khẩu của bạn để đăng nhập" image={curved9}>
      {isLoading ? (
        <SoftBox display="flex" justifyContent="center">
          <RotatingLines strokeColor="black" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
        </SoftBox>
      ) : user && user.token ? (
        <div>
          <h3 style={{ textAlign: "center" }}>Bạn đã đăng nhập.</h3>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={() => navigate("/virtual-reality")}>
              Bắt đầu
            </SoftButton>
          </SoftBox>
        </div>
      ) : (
        <SoftBox component="form" role="form">
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Tên đăng nhập
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" name="code" value={formData.code} onChange={handleFormData} placeholder="Tên đăng nhập" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Mật khẩu
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="password"
              name="password"
              onChange={handleFormData}
              placeholder="Mật khẩu"
              value={formData.password}
            />
          </SoftBox>
          <SoftBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Nhớ tôi
            </SoftTypography>
          </SoftBox>
          {error && (
            <SoftBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  fontSize: ".8em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all"
                }}
              >
                {error}
              </h6>
            </SoftBox>
          )}
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
              Đăng nhập
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Chưa có tài khoản?{" "}
              <SoftTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Đăng ký
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      )}
    </CoverLayout>
  );
}

export default SignIn;
