import { useSelector } from "react-redux";
import { Button, Container, Logo } from "../index.js";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.data);

  const navItems = [
    { name: "Home", link: "/", active: true },
    { name: "Write Post", link: "/create-post", active: isLoggedIn },
  ];
  return (
    <header className="mt-5">
      <Container>
        <nav className="flex justify-between items-center bg-white p-5 rounded-3xl border-2 border-slate-700 px-8">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex justify-center items-center gap-2">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className={({ isActive }) =>
                    `text-lg py-1.5 px-4 rounded-lg transition-all duration-300 hover:bg-slate-700/20 
                    ${isActive ? "text-blue-600 font-bold" : "font-semibold"}`
                  }
                >
                  {item.name}
                </NavLink>
              ) : null
            )}
          </div>

          {isLoggedIn ? (
            <Link to={`/u/${user.username}`}>
              <img
                className="size-12 ring-indigo-700 rounded-full transition-all duration-300 cursor-pointer hover:ring-8 hover:ring-slate-700/30 "
                src={user.avatar}
                alt=""
              />
            </Link>
          ) : (
            <div className="flex gap-5 items-center">
              <NavLink
                to="login"
                className={({ isActive }) =>
                  `text-lg transition-all duration-300 hover:text-blue-600
                ${isActive ? "text-blue-600 font-bold" : "font-semibold"}`
                }
              >
                Login
              </NavLink>
              <Button onClick={() => navigate("/register")}>Get started</Button>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
