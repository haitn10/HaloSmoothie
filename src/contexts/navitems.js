import {
  ConfirmationNumberOutlined,
  DashboardOutlined,
  DynamicFeedOutlined,
  HomeWorkOutlined,
  LocalMallOutlined,
  MenuOpenOutlined,
  PersonOutlineOutlined,
  PersonPinOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    text: "Menus",
    icon: <MenuOpenOutlined />,
  },
  {
    text: "Products",
    icon: <LocalMallOutlined />,
  },
  {
    text: "Offices",
    icon: <HomeWorkOutlined />,
  },
  {
    text: "Materials",
    icon: <DynamicFeedOutlined />,
  },
  {
    text: "Coupons",
    icon: <ConfirmationNumberOutlined />,
  },
  {
    text: "Users",
    icon: <PersonOutlineOutlined />,
  },
  {
    text: "Staffers",
    icon: <PersonPinOutlined />,
  },
  {
    text: "Settings",
    icon: <SettingsOutlined />,
  },
];

export default navItems;
