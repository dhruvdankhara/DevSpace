import { useState } from "react";
import { Button, Container, Input } from "./index";
import { registerUser } from "../api";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("dhruv dankhara");
  const [username, setUsername] = useState("dhruvdankhara");
  const [email, setEmail] = useState("dhruvdankhara@gmail.com");
  const [password, setPassword] = useState("dhruv123");
  const [error, setError] = useState("");

  const dispacth = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const registerUserToast = toast.loading("Registering user...");

    try {
      const response = await registerUser({ name, username, email, password });
      console.log("🚀 ~ Register User ~ response:", response);

      toast.success(`welcome, ${response.data.user.name}`, {
        id: registerUserToast,
      });

      dispacth(login(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.response.data.message}`, {
        id: registerUserToast,
      });
    }
    setError(error.response.data.message);
  };

  return (
    <div>
      <Container>
        <section className="rounded-3xl border-2 bg-white">
          <div className="mx-auto flex h-dvh flex-col items-center justify-center px-6 py-8">
            <div className="w-full max-w-lg rounded-xl border">
              <div className="flex flex-col gap-8 p-14">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Create new account
                </h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <Input
                    {...{
                      name: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "john doe",
                      value: name,
                      setValue: setName,
                    }}
                  />
                  <Input
                    {...{
                      name: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "example@mail.com",
                      value: email,
                      setValue: setEmail,
                    }}
                  />
                  <Input
                    {...{
                      name: "username",
                      label: "Username",
                      type: "text",
                      placeholder: "user123",
                      value: username,
                      setValue: setUsername,
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

                  <Button type="submit">Register</Button>
                  <p className="text-sm font-light text-gray-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Log in
                    </Link>
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

export default Register;
