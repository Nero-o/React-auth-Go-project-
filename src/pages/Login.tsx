import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";

const Login = (props: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterAccount = () => {
    navigate("/register");
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    navigate("/home");

    const content = await response.json();

    if (response.ok) {
      setErrorMessage("");
      props.setName(content.name);
    } else {
      setErrorMessage(content.message);
    }

    setIsLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Bem vindo de volta
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Ainda não tem uma conta?{" "}
        <Anchor size="sm" component="button" onClick={handleRegisterAccount}>
          Cadastre-se
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={submit}>
          <TextInput
            label="Email"
            placeholder="seu@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Senha"
            placeholder="*********"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Lembrar de mim" />
          </Group>
          {errorMessage && (
            <Text color="red" mt="sm">
              {errorMessage}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
