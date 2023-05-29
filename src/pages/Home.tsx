import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Flex,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },
  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    display: "flex",
    [theme.fn.smallerThan("xs")]: {},
  },
  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          setUserName(user.username);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleFetchError = () => {
      navigate("/");
    };

    window.addEventListener("error", handleFetchError);

    return () => {
      window.removeEventListener("error", handleFetchError);
    };
  }, []);

  const handleOpenGithub = () => {
    window.open("https://github.com/Nero-o/Go-Auth-backEnd", "_blank");
  };

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Bem-vindo,<span className={classes.highlight}>{userName}!</span>
            </Title>
            <Text color="dimmed" mt="md">
              Essa é uma aplicação web feita para cadastrar e autenticar
              usuários. <br />
              Espero que goste da experiência!
            </Text>
            <Group mt={30}>
              <Button radius={"xl"} size="md" className={classes.control}>
                Vamos começar
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                onClick={handleOpenGithub}
              >
                Código Fonte
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Home };
