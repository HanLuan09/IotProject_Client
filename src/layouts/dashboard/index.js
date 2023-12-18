// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useEffect, useRef, useState } from "react";
import SoftAvatar from "components/SoftAvatar";

function Dashboard() {

  const [className, setClassName] = useState('');
  const [imgSrc, setImgSrc] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:6868/classname', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         mode: 'cors',
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       setClassName(data.className);
  //       setImgSrc(data.img);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   // Call fetchData initially
  //   fetchData();

  //   // Set up an interval to call fetchData every, for example, 5000 milliseconds (5 seconds)
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 5000);

  //   // Clean up the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, []); 

  // console.log(className)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={10} md={6} lg={6}>
          <img src="http://localhost:6868/video_feed" alt="Video Stream" type="multipart/x-mixed-replace; boundary=frame" style={{width: '100%'}}></img>
          </Grid>
          <Grid item xs={10} md={6} lg={6}>
            {/* {className} */}
            <SoftBox mr={2}>
              <SoftAvatar src={`data:image/jpeg;base64, ${imgSrc}`} alt="Class Preview" size="sm" variant="rounded" />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
