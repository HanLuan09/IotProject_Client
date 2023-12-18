/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import AuthApi from "api/auth";
// Images
import team2 from "assets/images/482952682.jpg";
import { useEffect, useState } from "react";

function Author({ image, name}) {

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="xs"/>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      {/* <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography> */}
    </SoftBox>
  );
}

function Rows( { data } ) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    AuthApi.attendanceStudent(data)
      .then((response) => {
        const data = response.data.map((item) => ({
          author: <Author image={item.attendanceImg? `data:image/jpeg;base64,${item.attendanceImg}`:team2} name={item.attendanceName}/>,
          function: <Function job={item.attendanceSubject} />,
          room: (
            // <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {item.attendanceRoom}
            </SoftTypography>
          ),
          status: (
            // <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {item.attendanceDate}
            </SoftTypography>
          ),
          employed: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {item.attendanceTime}
            </SoftTypography>
          ),
          action: (
            <SoftTypography
              component="a"
              // href="#"
              variant="caption"
              color="secondary"
              fontWeight="medium"
            >
              Thành công
            </SoftTypography>
          ),
        }));
        setRows(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [data]); 

  return rows;
}

function authorsTableData( { data } ) {
  const rows = Rows( { data } );
  const columns = [
    { name: "author", align: "left", title: "Họ Và Tên" },
    { name: "function", align: "left", title: "Môn học" },
    { name: "room", align: "left", title: "Phòng học" },
    { name: "status", align: "center", title: "Ngày điểm danh" },
    { name: "employed", align: "center", title: "Giờ điểm danh" },
    { name: "action", align: "center", title: "Trạng thái" },
  ]
  return {
    columns: columns,
    rows: rows,
  }
  
};

export default authorsTableData;
