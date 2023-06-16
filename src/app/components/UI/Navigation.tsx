import React, { useState } from "react";
import { Container, TextField, InputAdornment, Button } from "@mui/material";
import { ReactComponent as SearchIcon } from "../UI/assets/images/Search.svg";
import { ReactComponent as Logo } from "../UI/assets/images/MyNews.svg";
import MobileNav from "./hamburger";
import { useMediaQuery } from "@mui/material";
import "./Global.scss";
import { useLocation, useParams } from "react-router-dom";

interface NavigationProps {
  handleSearch: (query: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobileView = useMediaQuery("(max-width: 1000px)");
  const currentLocation = useLocation();
  const params = useParams<{ category?: string }>();
  let formattedPathname;
  if (currentLocation.pathname.startsWith("/category") && params.category) {
    formattedPathname =
      params.category.charAt(0).toUpperCase() + params.category.slice(1);
  } else {
    formattedPathname =
      currentLocation.pathname.charAt(1).toUpperCase() +
      currentLocation.pathname.slice(2);
  }

  const handleSearchClick = () => {
    handleSearch(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <>
      {isMobileView ? (
        <MobileNav handleSearch={handleSearch} />
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            mt: 20,
            border: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="nav-desktop"
        >
          {currentLocation.pathname === "/" ? (
            <Logo />
          ) : (
            <h1>{formattedPathname}</h1>
          )}
          <TextField
            id="search"
            type="search"
            placeholder="Search News"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress} // handle 'Enter' key press
            sx={{
              width: "100%",
              maxWidth: "870px",
              "& fieldset": { border: "none" },
              background: "white",
              borderRadius: "10px",
              fontFamily: "'InterV_Semi', sans-serif",

            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingRight: "8px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <Button
                  className="search-button"
                  sx={{
                    background: "#BB1E1E",
                    fontSize: "15px",
                    color: "#fff",
                    padding: "6px 20px",
                    borderRadius: "6px",
                    fontWeight: 'bold',
                    fontFamily: "'InterV_Bold', sans-serif",
  
                  }}
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              ),
            }}
          />
        </Container>
      )}
    </>
  );
};

export default Navigation;
