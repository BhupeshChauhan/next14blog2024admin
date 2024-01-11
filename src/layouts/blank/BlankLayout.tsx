import { Box } from "@mui/material";
import AuthProvider from "../../utils/AuthProvider";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return <Box>{children}</Box>;
};

export default BlankLayout;
