import { useSelector } from "react-redux";
import { Button, Container } from "../index.js";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const navItems = [
    { name: "Home", link: "/", active: true },
    { name: "Write Post", link: "/create-post", active: isLoggedIn },
    { name: "Log in", link: "/login", active: !isLoggedIn },
  ];
  return (
    <header className="mt-5">
      <Container>
        <nav className="flex justify-between items-center bg-white p-5 rounded-full border-2 border-slate-700 px-8">
          <div>
            <Link to="/">
              <h1 className="font-bold text-2xl">DevSpace</h1>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-5">
            {navItems.map((item) =>
              item.active ? (
                <a key={item.name}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `hover:text-blue-600 transition-all duration-300 text-lg
                    ${isActive ? "text-blue-600 font-bold" : "font-semibold"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </a>
              ) : (
                ""
              )
            )}
            {isLoggedIn ? (
              <Link to={`/u/${user.username}`}>
                <img
                  className="w-12 ring-2 ring-blue-800 rounded-full p-0.5 hover:ring-4 transition-all duration-300 cursor-pointer"
                  src={user.avatar}
                  alt=""
                />
              </Link>
            ) : (
              <Button onClick={() => navigate("/register")}>Get started</Button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
