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
        <nav className="flex items-center justify-between rounded-3xl border-2 border-slate-700 bg-white p-5 px-8">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-1.5 text-lg transition-all duration-300 hover:bg-slate-700/20 ${isActive ? "font-bold text-blue-600" : "font-semibold"}`
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
                className="size-12 cursor-pointer rounded-full ring-indigo-700 transition-all duration-300 hover:ring-8 hover:ring-slate-700/30"
                src={user.avatar}
                alt=""
              />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="login"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-1.5 text-lg transition-all duration-300 hover:bg-slate-700/20 ${isActive ? "font-bold text-blue-600" : "font-semibold"}`
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
