import React, { useState } from "react";
import { Container, TextField, InputAdornment, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import "./Global.scss";

import TrackSvg from "./assets/images/track.svg";

const Track: React.FC = () => {
  const isMobileView = useMediaQuery("(max-width: 1000px)");
  const [isHidden, setIsHidden] = useState(false);

  const handleButtonClick = () => {
    setIsHidden(true);
  };

  return (
    <>
      {!isHidden && (
        <Container
          sx={{
            mt: 0,
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60px",
            width: "100%",
            backgroundImage: `url(${TrackSvg})`,
            backgroundSize: "cover",
            transition: "height 0.5s ease",
            overflow: "hidden",
          }}
          className="full-width-container"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "70%",
              height: "100%",
              border: "3px",
              padding: "20px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1
                style={{
                  fontWeight: "bold",
                  marginRight: "20px",
                  fontSize: "16px",
                  color: "#fff",
                  letterSpacing: "-0.14px",
                  fontFamily: "'InterV Bold', sans-serif",
                }}
              >
                Make MyNews your homepage
              </h1>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  letterSpacing: "-0.12px",
                  color: "#fff",
                  fontFamily: "'InterV', sans-serif",
                }}
              >
                Every day discover what’s trending on the internet!
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                className="get"
                variant="contained"
                color="primary"
                disableElevation
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  fontWeight: "bold",
                  fontFamily: "'InterV_Bold', sans-serif",
                }}
              >
                Get
              </Button>

              <Button
                color="primary"
                disableElevation
                style={{
                  marginLeft: "10px",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  fontWeight: "bold",
                  fontFamily: "'InterV Bold', sans-serif",
                }}
              >
                No Thanks
              </Button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Track;
