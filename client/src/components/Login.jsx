import { useState } from "react";
import { Button, Container, Input } from "./index";
import { loginUser } from "../api";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("dhruv@gmail.com");
  const [password, setPassword] = useState("dhruv123");
  const [error, setError] = useState("");

  const dispacth = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const loginUserToast = toast.loading("Login user...");

    try {
      const response = await loginUser({ email, password });
      console.log("🚀 ~ handleSubmit ~ response:", response);

      toast.success(`Welcome back, ${response.data.user.name}`, {
        id: loginUserToast,
      });

      dispacth(login(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.response.data.message}`, {
        id: loginUserToast,
      });
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <Container>
        <section className="rounded-3xl border-2 bg-white">
          <div className="mx-auto flex h-dvh flex-col items-center justify-center px-6 py-8">
            <div className="w-full max-w-lg rounded-xl border bg-white shadow-lg">
              <div className="flex flex-col gap-8 p-14">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Sign in to your account
                </h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <Input
                    {...{
                      name: "email",
                      label: "email",
                      type: "email",
                      placeholder: "example@mail.com",
                      value: email,
                      setValue: setEmail,
                    }}
                  />
                  <Input
                    {...{
                      name: "password",
                      label: "Password",
                      type: "password",
                      placeholder: "••••••••",
                      value: password,
                      setValue: setPassword,
                    }}
                  />
                  {error ? (
                    <div className="text-wrap rounded-lg border border-red-800 bg-red-400/80 px-5 py-3 text-white">
                      {error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center justify-start">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit">Sign in</Button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Login;
