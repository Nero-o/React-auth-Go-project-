import React, { SyntheticEvent, useState } from "react";
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
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAccount = () => {
    navigate("/");
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isPasswordValid(password)) {
      setPasswordError(
        "A senha deve conter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      );
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError("E-mail inválido");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("As senhas não são idênticas");
      return;
    }

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });
    if (response.ok) {
      navigate("/");
    } else {
      const data = await response.json();
      setEmailError(data.message);
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
        Bem vindo!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Já possui uma conta?{" "}
        <Anchor size="sm" onClick={handleLoginAccount} component="button">
          Faça login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nome"
            placeholder="Nome"
            required
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <TextInput
            label="Email"
            placeholder="seu@email.com"
            required
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            error={emailError}
            onFocus={() => setEmailError("")}
          />

          <PasswordInput
            label="Senha"
            placeholder="*******"
            required
            value={password}
            error={passwordError}
            onFocus={() => setPasswordError("")}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordInput
            label="Confirme sua senha"
            placeholder="*******"
            required
            error={passwordError && passwordError}
            onFocus={() => setPasswordError("")}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Lembrar de mim" />
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
