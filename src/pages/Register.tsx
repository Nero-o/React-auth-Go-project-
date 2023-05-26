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
import { registerUser } from "../service/api";
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

  const handleLoginAccount = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password.match(passwordRegex)) {
      setPasswordError(
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      );
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setEmailError("Email inválido");
      return;
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userData = {
        username,
        email,
        password: hashedPassword,
      };

      const response = await registerUser(userData);
      console.log(response);

      navigate("/login");
    } catch (error) {
      console.error(error); // Faça algo com o erro, como exibir uma mensagem de erro
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
        Bem vindo!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Já possui uma conta?{" "}
        <Anchor size="sm" onClick={handleLoginAccount} component="button">
          Faça login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
          error={emailError && emailError}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          label="Senha"
          placeholder="*******"
          required
          error={passwordError && passwordError}
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <PasswordInput
          label="Confirme sua senha"
          placeholder="*******"
          required
          error={passwordError && passwordError}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Lembrar de mim" />
          <Anchor component="button" size="sm">
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

export default Register;
