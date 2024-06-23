import { Inbox } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

export const MenuLateral = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(28)}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Avatar
              sx={{
                width: theme.spacing(12),
                height: theme.spacing(12),
              }}
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component={"nav"}>
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height={"100vh"} marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
