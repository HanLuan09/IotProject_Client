import React from "react";
// @mui material components
import Card from "@mui/material/Card";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DoAm from "assets/images/doam2.png"
import SoftAvatar from "components/SoftAvatar";

function TodoCard({ humidity }) {

  return (
    <Card>
      <SoftBox bgColor="dark" variant="gradient">
        <SoftBox p={3}>
          <SoftBox display="flex" justifyContent="space-between">
            <SoftTypography variant="h3" color="white">
              Độ ẩm
            </SoftTypography>
            <SoftBox textAlign="center" lineHeight={1}>
              <SoftTypography variant="h1" color="white" fontWeight="bold">
                {humidity} %
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox>
            <SoftAvatar src={DoAm} size="xl"/>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}
TodoCard.propTypes = {
  humidity: PropTypes.number,
};
export default TodoCard;
