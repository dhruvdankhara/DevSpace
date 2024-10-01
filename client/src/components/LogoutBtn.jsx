import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logoutUser } from "../api/index";
import { logout } from "../features/auth/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const logoutToast = toast.loading("Loging out...");
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
      dispatch(logout());

      toast.success("User Logout successfully", {
        id: logoutToast,
      });
    } catch (error) {
      console.log("Error in logout user: ", error);
      toast.error("Error while logout user", {
        id: logoutToast,
      });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="rounded-2xl bg-red-600 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-900"
    >
      Log out
    </button>
  );
}

export default LogoutBtn;
