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
        <section className="bg-white border-2 rounded-3xl">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-dvh">
            <div className="w-full bg-white rounded-xl border shadow-lg max-w-lg">
              <div className="p-14 flex flex-col gap-8">
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-3xl">
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
                    <div className="border px-5 py-3 rounded-lg border-red-800 bg-red-400/80 text-white text-wrap">
                      {error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center justify-start">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit">Sign in</Button>
                  <p className="text-sm font-light text-gray-500 ">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline "
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
