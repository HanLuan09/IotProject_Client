// @mui material components
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import subjectDetailsTableData from "layouts/tables/data/subjectDetailsTableData";
import { useNavigate } from "react-router-dom";
import AuthApi from "api/auth";
import * as XLSX from 'xlsx';
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const divStyle = {
  display: 'flex',
  position: 'relative',
};
const btnStyle = {
    margin: '0 15px',
    display: 'flex',
    alignItems: 'flex-end',
};

let user = localStorage.getItem("user");
user = JSON.parse(user);

function Tables() {
  const navigate = useNavigate();
  ///
  const [data, setData] = useState({
    code: user.token,
    startDate: null, 
    endDate: null, 
  });

  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);

  var urlParams = new URLSearchParams(window.location.search);
  var subjectId = urlParams.get('sub');
  const check = subjectId == null? 1:0;

  const { columns: columns, rows: rows } = authorsTableData({ data });

  const { subject: subject, columns: subCols, rows: subRows } = subjectDetailsTableData({ subjectId });

  const { columns: prCols, rows: prRows } = projectsTableData();

  
  const handleClickBack = () => navigate("/tables")

  const handleExportExcel = () => {
    // Gọi API để lấy dữ liệu
    AuthApi.subjectAttendanceById(subjectId)
      .then((response) => {
        const data = response.data.attendanceStudents.map(student => {
          const result = {
            "Họ và tên": student.name,
            "Mã sinh viên": student.code,
            "Số buổi vắng": student.absent
          };
          student.attendanceSchedules.forEach(schedule => {
            result[schedule.scheduleDate] = schedule.status;
          });
          
          return result;
        });
        
        // Tạo và xuất file Excel
        let subject = response.data.subject;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, subject+'.xlsx');
      });
  };

  const handleSubmit = () => {

    if (!startDate || !endDate) {
      alert('Xin hãy điền đầy đủ thông tin!');
      return;
    }else if(startDate > endDate) {
      alert('Xin hãy chọn ngày bắt đầu phải trước ngày kết thúc!');
      return;
    }
    setData({
        code: user.token,
        startDate,
        endDate,
    });
  };
  ///

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        { check === 1? (
          <>
            <SoftBox mb={3}>
              <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SoftTypography variant="h6">MÔN HỌC</SoftTypography>
                </SoftBox>
                {!prRows ? (
                <SoftBox display="flex" justifyContent="center">
                  <RotatingLines strokeColor="black" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                </SoftBox>
                ):(
                <SoftBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <Table columns={prCols} rows={prRows} />
                </SoftBox>
                )}
              </Card>
            </SoftBox>
            {!user.isAdmin && (
            <SoftBox mb={3}>
              <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SoftTypography variant="h6">LỊCH SỬ ĐIỂM DANH</SoftTypography>
                  <SoftBox>
                    <div style={divStyle}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DemoItem label="Từ ngày">
                                <DatePicker
                                    value={dayjs(startDate).format('YYYY/MM/DD')}
                                    onChange={(newValue) => setStartDate(dayjs(newValue).format('YYYY/MM/DD'))}
                                />

                                </DemoItem>
                                <DemoItem label="Đến ngày">
                                    <DatePicker
                                        value={dayjs(endDate).format('YYYY/MM/DD')}
                                        onChange={(newValue) => setEndDate(dayjs(newValue).format('YYYY/MM/DD'))}
                                    />
                                </DemoItem>
                            </DemoContainer>
                            <div style={btnStyle}>
                                <SoftButton 
                                    color="info"
                                    onClick={handleSubmit}
                                >
                                    Tìm kiếm
                                </SoftButton>
                            </div>
                        </LocalizationProvider>
                    </div>
                  </SoftBox>
                </SoftBox>
                <SoftBox
                  sx={{
                    height: "700px", // Set a fixed height for the container
                    overflowY: "auto", // Enable vertical scrollbar when content overflows
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <Table columns={columns} rows={rows} />
                </SoftBox>
              </Card>
            </SoftBox>
            )}
          </>
        ): (
          <>
            <SoftBox mb={3}>
              <SoftButton
                  onClick = {() => handleClickBack()}
                  variant="contained"
                  size="large"
                  circular
                  iconOnly
                  sx={() => ({ functions: { pxToRem } }) => ({
                    width: pxToRem(46),
                    height: pxToRem(46),
                    minWidth: pxToRem(46),
                    minHeight: pxToRem(46),
                    marginRight: pxToRem(1),
                })}
              >
                <svg 
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 48 48" 
                  fill="currentColor" 
                  xmlns="http://www.w3.org/2000/svg">
                      <path 
                          fillRule="evenodd" 
                          clipRule="evenodd" 
                          d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L10.8284 22H39C39.5523 22 40 22.4477 40 23V25C40 25.5523 39.5523 26 39 26H10.8284L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z">
                      </path>
                </svg>
              </SoftButton>
            </SoftBox>
            <SoftBox mb={3}>
              <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SoftTypography variant="h6" color="info" sx={{fontSize: '1.6rem', textTransform: 'uppercase' }}>{subject}</SoftTypography>
                  {/* {!user.isAdmin && (<SoftTypography variant="h6"> */}
                  {true && (<SoftTypography variant="h6">
                    <SoftButton
                        onClick = {() => handleExportExcel()}
                        variant="contained"
                        size="large"  
                        color="info"                                                                  
                    >
                      Xuất File Excel
                    </SoftButton>
                  </SoftTypography>
                  )}
                </SoftBox>
                <SoftBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <Table columns={subCols} rows={subRows} />
                </SoftBox>
              </Card>
            </SoftBox>
          </>
        )}

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
