import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as HomeIcon } from "../UI/assets/images/home.svg";
import { ReactComponent as GeneralIcon } from "../UI/assets/images/general.svg";
import { ReactComponent as BusinessIcon } from "../UI/assets/images/Business.svg";
import { ReactComponent as HealthIcon } from "../UI/assets/images/Health.svg";
import { ReactComponent as ScienceIcon } from "../UI/assets/images/Science.svg";
import { ReactComponent as SportsIcon } from "../UI/assets/images/Sports.svg";
import { ReactComponent as TechnologyIcon } from "../UI/assets/images/TV Guide.svg";
import { ReactComponent as Logo } from "../UI/assets/images/MyNews.svg";
import { InputAdornment, TextField } from "@mui/material";
import { FiBookmark } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import "./Header.scss";

interface MainNavigationProps {
  handleSearch: (query: string) => void;
}

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MainNavigation({ handleSearch }: MainNavigationProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [searchTerm, setSearchTerm] = useState("");
  const currentLocation = useLocation();
  const formattedPathname =
    currentLocation.pathname.charAt(1).toUpperCase() +
    currentLocation.pathname.slice(2);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerToggleAnimation = () => {
    setOpen(!open);
    const hamburgerIcon = document.getElementById("hamburger-icon");
    if (hamburgerIcon) {
      hamburgerIcon.classList.toggle("active");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchClick = () => {
    handleSearch(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const search = (
    <StyledSearch>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <TextField
        id="search"
        type="search"
        placeholder="Search News"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          width: "100%",
          maxWidth: "870px",
          "& fieldset": { border: "none" },
          background: "white",
          borderRadius: "10px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ paddingRight: "8px" }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </StyledSearch>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "transparent" }}
      className="hide-desktop"
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Container component="div" sx={{ flexGrow: 1, display: "flex" }}>
            {currentLocation.pathname === "/" ? (
              <Logo />
            ) : (
              <h1 className="naslov">{formattedPathname}</h1>
            )}
          </Container>

          {!isMobile && <Box component="div">{search}</Box>}

          <IconButton
            id="hamburger-icon"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            disableRipple
            onClick={handleDrawerToggleAnimation}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="right"
            open={open}
            onClose={handleDrawerToggle}
            sx={{ width: "100%" }}
            className="drawer-width"
          >
            {/* Drawer content */}
            <Box sx={{ p: 2, height: 1, background: "#f2f2f2" }}>
              <IconButton
                sx={{ p: 1, marginRight: "auto", width: "100%", color: "#000" }}
                edge="end"
                disableRipple
              >
                <CloseIcon onClick={handleDrawerToggle} />
              </IconButton>

              <Divider sx={{ mb: 6 }} />
              <Container
                sx={{ display: "flex", justifyContent: "center", p: 6 }}
              >
                <Logo />
              </Container>
              {search}
              <Container sx={{ p: 2 }}>
                <Menu
                  className="list-item-menu"
                  menuItemStyles={{
                    button: {
                      [`&.active`]: {
                        backgroundColor: "#13395e",
                        color: "#b6c8d9",
                      },
                    },
                  }}
                >
                  <MenuItem
                    className="list-item"
                    component={<Link to="/" />}
                    icon={<HomeIcon className="list-item-icon" />}
                  >
                    {" "}
                    Home
                  </MenuItem>

                  <MenuItem
                    className="list-item"
                    component={<Link to="/general" />}
                    icon={<GeneralIcon className="list-item-icon" />}
                  >
                    {" "}
                    General
                  </MenuItem>
                  <MenuItem
                    className="list-item"
                    component={<Link to="/Business%20Day" />}
                    icon={<BusinessIcon className="list-item-icon" />}
                  >
                    {" "}
                    Business
                  </MenuItem>
                  <MenuItem
                    className="list-item"
                    component={<Link to="/health" />}
                    icon={<HealthIcon className="list-item-icon" />}
                  >
                    {" "}
                    Health
                  </MenuItem>
                  <MenuItem
                    className="list-item"
                    component={<Link to="/science" />}
                    icon={<ScienceIcon className="list-item-icon" />}
                  >
                    {" "}
                    Science
                  </MenuItem>
                  <MenuItem
                    className="list-item"
                    component={<Link to="/sports" />}
                    icon={<SportsIcon className="list-item-icon" />}
                  >
                    {" "}
                    Sports
                  </MenuItem>
                  <MenuItem
                    className="list-item"
                    component={<Link to="/technology" />}
                    icon={<TechnologyIcon className="list-item-icon" />}
                  >
                    {" "}
                    Technology
                  </MenuItem>
                  <MenuItem
                    className="list-item"
                    component={<Link to="/favorites" />}
                    icon={<FiBookmark className="list-item-icon" />}
                  >
                    {" "}
                    Favorites
                  </MenuItem>
                </Menu>
              </Container>
            </Box>
          </Drawer>
        </Toolbar>
        {search}
      </Container>
    </AppBar>
  );
}
