import { followUser, unfollowUser } from "../api/index";
import { Button } from "./index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function FollowBtn({ userData, setUserData }) {
  // userData.setUserData()
  console.log("🚀 ~ FollowBtn ~ userData:", userData);

  // const [loading, setLoading] = useState(true);

  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const follow = async () => {
    const followToast = toast.loading("Following user...");

    if (!isUserLoggedIn) {
      toast.error("Login first!", {
        id: followToast,
      });
      return;
    }

    try {
      const response = await followUser(userData.username);
      console.log("🚀 ~ follow ~ response:", response);

      setUserData((prev) => ({
        ...userData,
        isFollowing: !prev.isFollowing,
        followers: prev.followers + 1,
      }));

      toast.success("followed", {
        id: followToast,
      });
    } catch (error) {
      console.log("🚀 ~ follow ~ error:", error);
      toast.error(error.response?.data?.message || "error in follow", {
        id: followToast,
      });
    }
  };

  const unfollow = async () => {
    try {
      const response = await unfollowUser(userData.username);
      console.log("🚀 ~ unfollow ~ response:", response);

      setUserData((prev) => ({
        ...prev,
        isFollowing: !prev.isFollowing,
        followers: prev.followers - 1,
      }));
      toast.success("unfollowed");
    } catch (error) {
      console.log("🚀 ~ unfollow ~ error:", error);
      toast.error(error.response?.data?.message || "Error in unfollow");
    }
  };

  return (
    <div>
      {userData.isFollowing ? (
        <Button onClick={unfollow}>unfollow</Button>
      ) : (
        <Button onClick={follow}>Follow</Button>
      )}
    </div>
  );
}

export default FollowBtn;
