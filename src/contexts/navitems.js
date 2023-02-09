import {
  ConfirmationNumberOutlined,
  DashboardOutlined,
  DynamicFeedOutlined,
  HomeWorkOutlined,
  LocalMallOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardOutlined />,
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
    text: "Cupons",
    icon: <ConfirmationNumberOutlined />,
  },
  {
    text: "Users",
    icon: <PersonOutlineOutlined />,
  },
  {
    text: "Settings",
    icon: <SettingsOutlined />,
  },
];

export default navItems;
