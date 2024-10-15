import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components/index";
import { useEffect, useState } from "react";
import { getUserProfile, updateAvatar, updateUser } from "../api/index";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function EditUser() {
  const { username } = useParams();

  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [isError, setIsError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserAvatar = async () => {
    const updateAvatarToast = toast.loading("Updating Avatar...");

    const formData = new FormData();
    formData.append("avatar", avatar);
    try {
      const response = await updateAvatar(formData);
      console.log("🚀 ~ updateAvatar ~ response:", response);

      toast.success("Avatar update successfully.", {
        id: updateAvatarToast,
      });
      dispatch(login(response.data));
    } catch (error) {
      console.log("🚀 ~ updateAvatar ~ error:", error);

      toast.error(`Error: ${error.response.data.message}`, {
        id: updateAvatarToast,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (avatar) {
      await updateUserAvatar();
    }

    const updateUserToast = toast.loading("Updating your details.");
    try {
      const response = await updateUser(userData);
      console.log("🚀 ~ updateUser ~ response:", response);

      toast.success("User details updated successfully.", {
        id: updateUserToast,
      });
      dispatch(login(response.data));
      navigate(`/u/${response.data.username}`);
    } catch (error) {
      console.log("🚀 ~ updateUser ~ error:", error);

      toast.error(`Error: ${error.response.data.message}`, {
        id: updateUserToast,
      });
    }
  };

  useEffect(() => {
    getUserProfile(username)
      .then((response) => {
        console.log(response);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(error.response.data.message);
      });
  }, []);

  return (
    <div className="my-10">
      <Container>
        <div className="rounded-xl border-2 border-black p-5">
          <div>
            <div>
              <h2 className="text-center text-4xl font-bold">Edit Profile</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="flex flex-col gap-5 rounded-xl border-2 border-black p-5">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={avatar ? URL.createObjectURL(avatar) : userData.avatar}
                  alt=""
                />

                <button className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-zinc-100">
                  <label
                    className="font-bol flex items-center justify-center gap-5 text-lg"
                    htmlFor="avatar"
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    <span>Upload Photo</span>
                  </label>
                  <input
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="hidden"
                    id="avatar"
                    type="file"
                  />
                </button>
              </div>
              <div className="col-span-2 rounded-xl border-2 border-black p-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full rounded-xl border border-gray-600 bg-gray-50 px-3.5 py-2.5 text-gray-900"
                      placeholder="Enter name"
                      value={userData.name}
                      required=""
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* username */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-900"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="w-full rounded-xl border border-gray-600 bg-gray-50 px-3.5 py-2.5 text-gray-900"
                      placeholder="Enter username"
                      value={userData.username}
                      required=""
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* email */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full rounded-xl border border-gray-600 bg-gray-50 px-3.5 py-2.5 text-gray-900"
                      placeholder="Enter email"
                      value={userData.email}
                      required=""
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* gender */}
                  <div>
                    <label htmlFor="gender" className="font-semibold">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      className="w-full rounded-xl border border-black p-2 text-xl"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* submit button */}
                  <div className="self-center">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EditUser;
