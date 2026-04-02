import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { FaUser } from "react-icons/fa";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [listOpen, setListOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token-info");
    navigate("/");
  };

  const toggleList = async () => {
    setListOpen((prev) => !prev);
  };

  return (
    <div
      // position="static"
      className="bg-white! h-14 border-l-0 fixed top-0 right-0 left-0 z-1030  shadow-none! border border-gray-300 flex!    "
    >
      <Typography
        variant="h6"
        component="div"
        className="w-full! flex! justify-end! text-red-500!"
        sx={{ flexGrow: 1 }}
      >
        <IconButton className="relative!" onClick={toggleList}>
          <Avatar></Avatar>
          {listOpen ? (
            <Card className="absolute top-11 z-30 h-52 right-9 w-50! bg-red-500!">
              <div className="flex gap-3 items-center border-b w-50  p-2 border-b-gray-300!">
                <h4 className="text-xl">@harshJoshi</h4>
              </div>
              <List>
                <ListItem className="p-2">
                  <h5 className="flex items-center gap-2 text-[20px]">
                    <FaUser className="text-xl" />
                    Role: <span className="text-[168x]">Librarian</span>{" "}
                  </h5>
                </ListItem>
                <ListItem
                  disablePadding
                  className="   hover:bg-[#FDF0EC] rounded-[13px]! "
                >
                  <ListItemButton className="p-0 pl-2! pr-2!" onClick={handleLogOut}>
                    <ListItemIcon className="text-[16px]! items-center! gap-2 hover:text-red-600!">
                      <MdLogout />
                      <ListItemText
                        className="text-[15px]!"
                        primary="Log Out"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </Card>
          ) : null}
        </IconButton>
      </Typography>
      {/* <Button color="inherit"></Button> */}
    </div>
  );
}
