import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../UI/assets/images/home.svg";
import { ReactComponent as GeneralIcon } from "../UI/assets/images/general.svg";
import { ReactComponent as BusinessIcon } from "../UI/assets/images/Business.svg";
import { ReactComponent as HealthIcon } from "../UI/assets/images/Health.svg";
import { ReactComponent as ScienceIcon } from "../UI/assets/images/Science.svg";
import { ReactComponent as SportsIcon } from "../UI/assets/images/Sports.svg";
import { ReactComponent as TechnologyIcon } from "../UI/assets/images/TV Guide.svg";
import { ReactComponent as TopList } from "../UI/assets/images/Top lists.svg";
import { FiBookmark } from "react-icons/fi";
import "./Global.scss";
const SidebarMenu = () => {
  return (
    <Sidebar className="desktop-sidebar">
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem component={<Link to="/" />} icon={<HomeIcon />}>
          Home
        </MenuItem>
        <MenuItem component={<Link to="/general" />} icon={<GeneralIcon />}>
          General
        </MenuItem>
        <MenuItem
          component={<Link to="/Business%20Day" />}
          icon={<BusinessIcon />}
        >
          Business
        </MenuItem>
        <MenuItem component={<Link to="/health" />} icon={<HealthIcon />}>
          Health
        </MenuItem>
        <MenuItem component={<Link to="/science" />} icon={<ScienceIcon />}>
          Science
        </MenuItem>
        <MenuItem component={<Link to="/sports" />} icon={<SportsIcon />}>
          Sports
        </MenuItem>
        <MenuItem
          component={<Link to="/technology" />}
          icon={<TechnologyIcon />}
        >
          Technology
        </MenuItem>
        <MenuItem component={<Link to="/favorites" />} icon={<FiBookmark />}>
          Favorites
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
