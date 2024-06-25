import { NavLink } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { Box, Button } from "@mantine/core";

export const Home = () => {
  const { user, setUser, clearUser } = useUserStore();

  return (
    <div>
      {user ? (
        <div>
          <h1>Bienvenido, {user.name}</h1>
          <p>Email: {user.email}</p>
          <Button onClick={clearUser}>Cerrar sesión</Button>
        </div>
      ) : (
        <div>
          <h1>No hay usuario logueado</h1>
          <Button
            onClick={() =>
              setUser({
                _id: "1",
                name: "John Doe",
                email: "john.doe@example.com",
              })
            }
          >
            Iniciar sesión
          </Button>
        </div>
      )}
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
        ducimus, aliquam atque dignissimos non minima. Facere incidunt veritatis
        libero similique voluptates unde aliquid odit vitae? Debitis suscipit
        excepturi nisi vitae!
      </div>
      <Box bg="red.5" my="xl">
        My component
        <NavLink to="">test</NavLink>
      </Box>
      <Button variant="filled" color="violet" onClick={() => alert("click")}>
        Copy link to clipboard
      </Button>
    </div>
  );
};
