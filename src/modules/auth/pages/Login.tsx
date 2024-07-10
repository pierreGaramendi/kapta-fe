import { Button, TextInput } from "@mantine/core";
import { RememberMe } from "./components/RememberMe";
import { isNotEmpty, useForm } from "@mantine/form";
import { loginFnMutation } from "./useLogin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import useUserStore from "../../stores/userStore";

export const Login = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const { login } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginFnMutation,
    onSuccess: (data: any) => {
      const user = { id: "1", name: "John Doe", email: "email@email.com" };
      setUser(user);
      login();
      navigate("/");
    },
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: isNotEmpty("Name is required"),
    },
  });

  const handleLogin = (values: any) => {
    const { email, password } = values;
    mutation.mutate({ email, password });
  };

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          height: "100vh",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div>aqui va logo</div>
        </div>
        <div>
          <div>
            <h1>Sign in to your account</h1>
            <form onSubmit={form.onSubmit(handleLogin)}>
              <div>
                <TextInput
                  placeholder="name@company.com"
                  label="Email"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
              </div>
              <div>
                <TextInput
                  placeholder="6 characteres"
                  type="password"
                  label="Password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
              </div>
              <RememberMe></RememberMe>
              <Button type="submit">Sign in</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
