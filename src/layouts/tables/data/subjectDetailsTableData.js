import Tippy from '@tippyjs/react/headless';
import React, { useState, useEffect } from 'react';
import AuthApi from "api/auth";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBox from "components/SoftBox";
import account from "assets/images/482952682.jpg";
import { Card } from '@mui/material';


function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox >
        <SoftAvatar src={image} alt={name} size="md" variant="rounded"/>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium" sx={{fontSize: '1.05rem' }}>
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary" sx={{fontSize: '0.8rem' }}>
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}
function Attendance( {status, image, name, email, date, time} ) {

  const renderPreview = ( {props} ) => {
    return (
      <Card tabIndex="-1" {...props}>
        <SoftBox bgColor="light" variant="gradient">
          <SoftBox p={1}>
            <SoftBox display="flex" justifyContent="center">
              <SoftTypography variant="button" color="primary" fontWeight="medium" sx={{ pl: 2, fontSize: '1rem', textTransform: 'uppercase' }}>
                iot và ứng dụng
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="space-between">
            <SoftBox display="flex" alignItems="center" px={1} py={1}>
                <SoftBox px={1}>
                  <SoftAvatar src={image? `data:image/jpeg;base64,${image}`:account} alt={name} size="xl"/>
                </SoftBox>
                <SoftBox px={1} display="flex" flexDirection="column">
                  <SoftTypography variant="button" fontWeight="medium" sx={{fontSize: '1.2rem' }}>
                    {name}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary" sx={{fontSize: '0.8rem' }}>
                    {email}
                  </SoftTypography>
                  <SoftTypography variant="button" color="success" sx={{fontSize: '0.9rem' }}>
                    {date}
                  </SoftTypography>
                  <SoftTypography variant="button" color="error" sx={{fontSize: '0.9rem' }}>
                    {time}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    );
  };
  return (
    (status === 1) ? (
      <Tippy interactive delay={[300, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="success"
          fontWeight="medium"
          sx={{ pl: 4.5, pr: 8, fontSize: '1rem' }}
        >
          {status}
        </SoftTypography>
      </Tippy>
    ) : (
      <SoftTypography variant="button" color="text" fontWeight="medium" sx={{ pl: 4.5, pr: 8, fontSize: '1rem' }}>
        {status}
      </SoftTypography>
    )
  );
}

function Rows({ subjectId }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [subject, setSubject] = useState();
  useEffect(() => {
    // Gọi API để lấy dữ liệu
    AuthApi.subjectAttendanceById(subjectId)
      .then((response) => {
        setSubject(response.data.subject)
        const students = response.data.attendanceStudents;
        // Tạo ra một mảng chứa tất cả ngày học từ dữ liệu
        const dates = students[0].attendanceSchedules.map(schedule => schedule.scheduleDate);
        const dateColumns = dates.map((date) => (
          { name: date, align: "left", title: date }
        ));
        setColumns([
          { name: "name", align: "left", title: "Họ và tên" },
          // { name: "subject", align: "left", title: "Môn học" },
          ...dateColumns,
          { name: "absent", align: "left", title: "Vắng" },
        ]);
        
        const dataRows = students.map(student => {
          // console.log(student)
          const attendanceByDate = student.attendanceSchedules.reduce((acc, schedule) => {
            const dateKey = schedule.scheduleDate;
            acc[dateKey] = (
              <Attendance 
                status={schedule.status} 
                image={schedule.scheduleImg} 
                name={student.name} 
                email={student.code}
                date={dateKey}
                time={schedule.scheduleTime}
              />
            );
            return acc;
          }, {});
          
          return {
            name: <Author image={account} name={student.name} email={student.code} />,
            // subject: (
            //   <SoftTypography variant="button" color="text" fontWeight="medium" sx={{fontSize: '1rem' }}>
            //     {response.data.subject}
            //   </SoftTypography>
            // ),
            ...attendanceByDate,
            absent: (
              <SoftTypography variant="button" color="error" fontWeight="medium" sx={{ pl: 3, pr: 6, fontSize: '1rem'  }}>
                {student.absent}
              </SoftTypography>
            ),
            
          };
        });
        // console.log(dataRows)
        setRows(dataRows);

      })
      .catch(error => {
        console.log(error);
      });
  }, [subjectId]); 
  return { subject, columns, rows};
}


function subjectDetailsTableData({ subjectId }) {
  const { subject, columns, rows } = Rows({ subjectId });

  return {
    subject: subject,
    columns: columns,
    rows: rows,
  };
}

export default subjectDetailsTableData;
