import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  followUser,
  getUserPosts,
  getUserProfile,
  unfollowUser,
} from "../api/index";
import { Button, Container, BlogCard, LogoutBtn } from "../components/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stateUserData = useSelector((state) => state.auth.user);
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
      const response = await followUser(userData._id);
      console.log("🚀 ~ follow ~ response:", response);
      setUserData({ ...userData, isFollowing: !userData.isFollowing });
      toast.success("followed", {
        id: followToast,
      });
    } catch (error) {
      console.log("🚀 ~ follow ~ error:", error);
      toast.error(error.response.data.message, {
        id: followToast,
      });
    }
  };

  const unfollow = async () => {
    try {
      const response = await unfollowUser(userData._id);
      console.log("🚀 ~ unfollow ~ response:", response);
      setUserData({ ...userData, isFollowing: !userData.isFollowing });
      toast.success("unfollowed");
    } catch (error) {
      console.log("🚀 ~ unfollow ~ error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userProfileResponse = await getUserProfile(username);
        console.log(
          "🚀 ~ fetchProfileData ~ userProfileResponse:",
          userProfileResponse
        );
        setUserData(userProfileResponse.data);

        const userPostResponse = await getUserPosts(username);
        console.log(
          "🚀 ~ fetchProfileData ~ userPostResponse:",
          userPostResponse
        );
        setBlogs(userPostResponse.data);

        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ fetchProfileData ~ error:", error);
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div className="my-10">
        <Container>
          <div className="border-2 border-black rounded-2xl p-5">
            <p className="font-bold text-center text-2xl">{error}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="my-10">
      <Container>
        <div className="border-2 border-black rounded-2xl p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div className="sticky top-5 border-2 border-black/70 rounded-2xl p-5 flex flex-col gap-3 items-center md:items-start">
                <div>
                  <img
                    className="w-24 h-24 rounded-full"
                    src={userData.avatar}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1 md:items-start items-center">
                  <p className="text-2xl font-bold">{userData.name}</p>
                  <p className="text-base">@{userData.username}</p>
                </div>
                <div className="flex gap-2">
                  <p>
                    <span className="font-bold">{userData.followers} </span>
                    Followers
                  </p>
                  <p>
                    <span className="font-bold">{userData.following} </span>
                    Following
                  </p>
                </div>
                {userData._id == stateUserData._id ? (
                  <div className="flex gap-3">
                    <Link
                      className="rounded-2xl bg-blue-600 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-900"
                      to={`/u/${userData.username}/edit`}
                    >
                      Edit
                    </Link>
                    <LogoutBtn />
                  </div>
                ) : (
                  <div>
                    {userData.isFollowing ? (
                      <Button onClick={unfollow}>unfollow</Button>
                    ) : (
                      <Button onClick={follow}>Follow</Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              {blogs.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {blogs &&
                    blogs.map((blog) => <BlogCard key={blog._id} {...blog} />)}
                </div>
              ) : (
                <div className="border-2 border-black rounded-2xl p-5">
                  <p className="font-bold text-center text-3xl">
                    No Post Found
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="sticky top-5 border-2 border-black/70 rounded-2xl p-5 hidden lg:block">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-xl">hashtags</p>
                  <ul>
                    <li>#DSA</li>
                    <li>#ReactJs</li>
                    <li>#Nodejs</li>
                    <li>#blockchain</li>
                    <li>#java</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
