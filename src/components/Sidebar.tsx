import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavItems } from "../data/NavItems.js";
import Avatar from "@mui/material/Avatar";
import darkLogo from "../assets/darkLogo.png";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks.js";
import { logout } from "../redux/features/slice/authSlice.js";

const drawerWidth = 240;

export default function SideBar() {
  const [location, setLocation] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleLogOut = async (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token-info");
    navigate("/");
  };

  // const windowWidth = window.innerWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className="relative"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="flex h-15.25 pl-3 gap-2 items-center">
          <Avatar alt="Travis Howard" src={darkLogo} />
          <Typography className="font-[Poppins]!" variant="h6" style={{ fontWeight: "600" }}>
            <span className="text-green-400">Book</span>Worm
          </Typography>
        </div>

        <Divider />
        <div className="flex justify-between font-[Poppins]! flex-col h-full">
          <div>
            <List>
              {mainNavItems.map((item) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  style={{
                    backgroundColor: location == item.id ? "#FDF0EC" : "",
                  }}
                  className=" w-45!  ml-auto mb-0.5 mr-auto hover:bg-[#FDF0EC] rounded-[13px]! "
                >
                  <ListItemButton
                    className="text-[17px]! flex! rounded-xl! w30 items-center! gap-3 hover:text-red-600!"
                    style={{ color: location == item.id ? "red" : "" }}
                    onClick={async () => {
                      navigate(item.route);
                      setLocation(item.id);
                    }}
                  >
                    {item.logo}
                    {item.text}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            <Divider />
            <List>
              <ListItem
                disablePadding
                className=" w-45!  ml-auto  mr-auto   hover:bg-[#FDF0EC] rounded-[13px]! "
              >
                <ListItemButton onClick={() => dispatch(logout())}>
                  <ListItemIcon className="text-[16px]! items-center! gap-2 hover:text-red-600!">
                    <MdLogout />
                    <ListItemText className="text-[15px]!" primary="Log Out" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
