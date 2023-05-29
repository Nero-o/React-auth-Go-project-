import React, { useEffect, useState } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          setUserName(user.name);
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

  return (
    <div>
      <h1>Bem-vindo, {userName}!</h1>
      <p>Esta é a página Home.</p>
    </div>
  );
};

const PrivateRoute = ({ element: Element, ...rest }: any) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Route
      {...rest}
      element={authenticated ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export { Home, PrivateRoute };
