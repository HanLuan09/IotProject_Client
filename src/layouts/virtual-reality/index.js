// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// VR dashboards components
import BaseLayout from "layouts/virtual-reality/components/BaseLayout";

// VRInfo dashboards components
import TodoList from "layouts/virtual-reality/components/TodoList";
import TodoCard from "layouts/virtual-reality/components/TodoCard";

// Images
import team1 from "assets/images/icon_account_.jpg";
import sunCloud from "assets/images/small-logos/icon-sun-cloud.png";
//
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
// mqtt
import { Client } from 'paho-mqtt';
import { MQTT_BROKER, MQTT_PORT } from "config/configmqtt";

const TEMPERATURE_TOPIC = "temperature";
const HUMIDITY_TOPIC = "humidity";

function VRInfo() {

  const navigate = useNavigate();

  const { d1, h2, fontWeightMedium } = typography;

  const [vietnamTime, setVietnamTime] = useState(moment().tz('Asia/Ho_Chi_Minh'));

  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();

  useEffect(() => {
    // Khởi tạo MQTT client
    const client = new Client(MQTT_BROKER, MQTT_PORT, "clientclassroomid_" + parseInt(Math.random() * 100, 10));
    // Khi kết nối thành công với broker
    const onConnect = () => {
      console.log('Connected to MQTT broker');
      client.subscribe(TEMPERATURE_TOPIC);
      client.subscribe(HUMIDITY_TOPIC);
    };

    // Khi nhận được tin nhắn từ broker
    const onMessageArrived = (message) => {
      const payload = message.payloadString;
      if (message.destinationName === TEMPERATURE_TOPIC) {
        setTemperature(parseInt(payload));
      }
      if (message.destinationName === HUMIDITY_TOPIC) {
        setHumidity(parseInt(payload));
      }
    };

    // Thiết lập callback functions
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(`Connection lost: ${responseObject.errorMessage}`);
      }
    };
    client.onMessageArrived = onMessageArrived;

    // Kết nối đến MQTT broker
    client.connect({ onSuccess: onConnect });

    // Ngắt kết nối khi component unmounts
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []); // Thực hiện chỉ một lần khi component mount

  // Time
  useEffect(() => {
    const interval = setInterval(() => {
      setVietnamTime(moment().tz('Asia/Ho_Chi_Minh')); // Cập nhật thời gian mỗi giây
    }, 1000);

    return () => clearInterval(interval); // Hủy interval khi component unmount
  }, []); // Tham số thứ hai là một mảng trống để chỉ chạy useEffect khi component mount

  return (
    <BaseLayout>
      <SoftBox
        minHeight="100vh"
        ml={{ xs: 0, md: 10 }}
        mt={{ xs: 0, md: 4 }}
        pt={{ xs: 16, md: 32 }}
        pb={{ xs: 0, md: 3 }}
        sx={{ transform: "scale(1.1)" }}
      >
        <Grid container>
        <Grid item xs={12} md={1}>
            <SoftBox
              display="flex"
              flexDirection={{ xs: "row", md: "column" }}
              justifyContent="center"
              alignItems="center"
              px={2}
              mb={{ xs: 8, md: 0 }}
            >
              <Tooltip title="Profile" placement="right">
                <SoftAvatar
                  src={team1}
                  alt="Profile Picture"
                  size="lg"
                  variant="rounded"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {navigate('/profile')}}
                />
              </Tooltip>

              <SoftBox my={{ xs: 0, md: 2 }} mx={{ xs: 2, md: 0 }}>
                <Tooltip title="Home" placement="right">
                  <SoftButton
                    size="large"
                    iconOnly
                    sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                      color: dark.main,
                      borderRadius: borderRadius.lg,
                    })}
                  >
                    <Icon>home</Icon>
                  </SoftButton>
                </Tooltip>
              </SoftBox>
              <SoftBox mb={{ xs: 0, md: 2 }} mr={{ xs: 2, md: 0 }}>
                <Tooltip title="Search" placement="right">
                  <SoftButton
                    size="large"
                    iconOnly
                    sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                      color: dark.main,
                      borderRadius: borderRadius.lg,
                    })}
                  >
                    <Icon>search</Icon>
                  </SoftButton>
                </Tooltip>
              </SoftBox>
              <Tooltip title="Minimize" placement="right">
                <SoftButton
                  size="large"
                  iconOnly
                  sx={({ palette: { dark }, borders: { borderRadius } }) => ({
                    color: dark.main,
                    borderRadius: borderRadius.lg,
                  })}
                >
                  <Icon>more_horiz</Icon>
                </SoftButton>
              </Tooltip>
            </SoftBox>
          </Grid>

          <Grid item xs={12} md={11} lg={10} xl={9}>

            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "center", md: "flex-start" }}
              ml={{ xs: 1, md: 4 }}
              mt={-1}
            >
              <SoftBox>
                <SoftBox
                  fontSize={{ xs: h2.fontSize, lg: d1.fontSize }}
                  fontWeight={fontWeightMedium}
                  lineHeight={1}
                >
                  {temperature}&deg;C
                </SoftBox>
                <SoftTypography variant="h4" fontWeight="regular" textTransform="uppercase" color = "error">
                  {vietnamTime.format('DD-MM-YYYY')}
                </SoftTypography>
                <SoftTypography variant="h4" fontWeight="regular" textTransform="uppercase" color= "secondary">
                  {vietnamTime.format('HH:mm:ss')}
                </SoftTypography>
              </SoftBox>
              <SoftBox component="img" src={sunCloud} width="30%" />
            </SoftBox>
            <SoftBox mt={3} mb={8} ml={{ xs: 1, md: 4 }} mr={{ xs: 1, md: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <SoftBox mb={3}>
                    <TodoCard humidity = {humidity}/>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TodoList/>
                </Grid>
              </Grid>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </BaseLayout>
  );
}

export default VRInfo;
