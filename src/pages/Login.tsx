import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { loginUser } from "../service/api";
import bcrypt from "bcryptjs";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleNewPassword = () => {
    navigate("/forgotPassword");
  };

  const handleSubmit = async () => {
    try {
      const userData = {
        email,
        password,
      };
      const response = await loginUser(userData);

      if (response.success) {
        navigate("/register");
      } else {
        setLoginError("Senha incorreta");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setLoginError("Email inválido ou usuário inexistente");
      } else {
        console.error(error);
        setLoginError("Erro ao fazer login");
      }
    }
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
        Bem-vindo de volta!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Ainda não possui uma conta?{" "}
        <Anchor size="sm" onClick={handleCreateAccount} component="button">
          Crie uma conta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="*******"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        {loginError && (
          <Text color="red" size="sm" mt={10}>
            {loginError}
          </Text>
        )}
        <Group position="apart" mt="lg">
          <Checkbox label="Lembrar de mim" />
          <Anchor component="button" onClick={handleNewPassword} size="sm">
            Esqueceu a senha?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Entrar
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
