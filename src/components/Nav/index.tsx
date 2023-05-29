import React, { useState } from "react";
import {
  Group,
  rem,
  createStyles,
  Box,
  Header,
  Button,
  Burger,
  Drawer,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

interface HeaderResponsiveProps {
  name: string;
  setName: (name: string) => void;
}

const CustomNavbar = (props: HeaderResponsiveProps) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const { classes, theme } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const navigateLogin = () => {
    navigate("/");
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  const logout = async () => {
    setIsLoading(true);

    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    navigate("/");
    props.setName("");
    setIsLoading(false);
  };

  let menu;

  if (props.name === "") {
    menu = (
      <div>
        <Header height={60} px={"md"}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Group className={classes.hiddenDesktop}>
              <Button variant="default" onClick={navigateLogin}>
                Login
              </Button>
              <Button onClick={navigateRegister}>Cadastre-se</Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenMobile}
            />
          </Group>
        </Header>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="50%"
          padding="md"
          className={classes.hiddenMobile}
          zIndex={1000000}
        >
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Button.Group orientation="vertical">
            <Button mb={10} variant="default" onClick={navigateLogin}>
              Log in
            </Button>
            <Button onClick={navigateRegister}>Cadastre-se</Button>
          </Button.Group>
        </Drawer>
      </div>
    );
  } else {
    menu = (
      <div>
        <Header height={60} px={"md"}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Group className={classes.hiddenDesktop}>
              <Button onClick={logout} loading={isLoading}>
                Logout
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenMobile}
            />
          </Group>
        </Header>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="40%"
          padding="md"
          className={classes.hiddenMobile}
          zIndex={1000000}
        >
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Group position="center" grow pb="xl" px="md">
            <Button onClick={logout} loading={isLoading}>
              Logout
            </Button>
          </Group>
        </Drawer>
      </div>
    );
  }

  return (
    <Box>
      <div>{menu}</div>
    </Box>
  );
};

export default CustomNavbar;
