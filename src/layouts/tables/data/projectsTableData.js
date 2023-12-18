import React, { useState, useEffect } from "react";
import AuthApi from "api/auth";
import SoftTypography from "components/SoftTypography";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftProgress from "components/SoftProgress";
import logoJira from "assets/images/small-logos/logo-jira.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium" sx={{fontSize: '1rem'}}>
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

let user = localStorage.getItem("user");
user = JSON.parse(user);

function Rows() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    AuthApi.Subject(user.token)
      .then((response) => {
        const data = response.data.map((item) => ({
          subject: [logoJira, item.subject],
          semester: (
            <SoftTypography variant="button" color="text" fontWeight="medium" sx={{fontSize: '1rem'}}>
              {item.semester}
            </SoftTypography>
          ),
          schoolYear: (
            <SoftTypography variant="caption" color="text" fontWeight="medium" sx={{fontSize: '1rem'}}>
              {item.schoolYear}
            </SoftTypography>
          ),
          completion: <Completion value={item.progress} color="success" />,
          action: (
            <SoftTypography
                component="a"
                href={`tables?sub=${item.subjectId}`}
                variant="caption"
                color="secondary"
                fontWeight="medium"
              >
                <Icon sx={{ cursor: "pointer", fontWeight: "bold"}} fontSize="small">
                  more_vert
                </Icon>
            </SoftTypography>  
          ),
        }));
        setRows(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // Thêm một dependency trống để đảm bảo useEffect chỉ chạy một lần

  return rows;
}

function projectsTableData() {
  const rows = Rows();

  const columns = [
    { name: "subject", align: "left", title: "Môn học" },
    { name: "semester", align: "left", title: "Kỳ học" },
    { name: "schoolYear", align: "left", title: "Năm học" },
    { name: "completion", align: "center", title: "Tiến độ" },
    { name: "action", align: "center", title: "Chi tiết" },
  ];

  return {
    columns: columns,
    rows: rows,
  };
}

export default projectsTableData;
