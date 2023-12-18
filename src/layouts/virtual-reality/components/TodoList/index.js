// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useState, useEffect, useRef } from "react";
// MQTT
import { Client } from 'paho-mqtt';
import { MQTT_BROKER, MQTT_PORT } from "config/configmqtt";

function TodoList() {

  const [led1Status, setLed1Status] = useState(false);
  const [led2Status, setLed2Status] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!clientRef.current) {
      // Khởi tạo MQTT client nếu chưa tồn tại
      clientRef.current = new Client(MQTT_BROKER, MQTT_PORT, "clientpushid_" + parseInt(Math.random() * 100, 10));

      clientRef.current.onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('Kết nối đã bị mất: ', responseObject.errorMessage);
        }
      };

      clientRef.current.onMessageArrived = function (message) {
        const topic = message.destinationName;
        const payload = message.payloadString;
        if (topic === 'button1') {
          setLed1Status(payload==1? true:false);
        } else if (topic === 'button2') {
          setLed2Status(payload==1? true:false);
        }
      };

      clientRef.current.connect({
        onSuccess: () => {
          console.log('Kết nối thành công với MQTT broker...');
          clientRef.current.subscribe('button1');
          clientRef.current.subscribe('button2');
        },
        onFailure: (errorCode) => {
          console.log('Kết nối thất bại: ', errorCode);
        },
      });
    }

    return () => {
      // Ngắt kết nối MQTT khi component unmounts
      if (clientRef.current.isConnected()) {
        clientRef.current.disconnect();
      }
    };
  }, []);  

  const toggleLed = (led) => {
    var s1 = led1Status? "on":"off";
    var s2 = led2Status? "on":"off";
    if (clientRef.current && clientRef.current.isConnected()) {
      clientRef.current.send(`lightbulb${led}`, led == 1 ? s1:s2);
    }
  };
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox p={3}>
        <SoftBox display="flex" lineHeight={1}>
          <SoftBox mr={3} mt={1}>
          <Switch checked={led1Status} onChange={() => toggleLed(1)}/>
          </SoftBox>
          <SoftBox>
            <SoftTypography variant="h3" fontWeight="medium">
              Đèn 1
            </SoftTypography>
            <SoftTypography variant="button" fontWeight="regular" color="secondary">
            {led1Status? "BẬT" : "TẮT"}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <Divider />
        <SoftBox display="flex" lineHeight={0}>
          <SoftBox mr={3} mt={1}>
            <Switch checked={led2Status} onChange={() => toggleLed(2)}/>           
          </SoftBox>
          <SoftBox>
            <SoftTypography variant="h3" fontWeight="medium">
              Đèn 2
            </SoftTypography>
            <SoftTypography variant="button" fontWeight="regular" color="secondary">
              {led2Status? "BẬT" : "TẮT"}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        {/* <Divider /> */}
      </SoftBox>
    </Card>
  );
}

export default TodoList;
