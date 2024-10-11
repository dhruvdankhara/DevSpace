import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import apiClient, { likeBlogPost, unlikeBlogPost } from "../api";

function LikeBtn({ _id, isLiked, likes, setPost }) {
  const likePost = async () => {
    const likeToast = toast.loading("Liking Post...");

    try {
      const response = await likeBlogPost(_id);

      console.log("🚀 ~ likePost ~ response:", response);

      toast.success("Liked Post successfully.", { id: likeToast });
      setPost((prev) => ({ ...prev, isLiked: true, likes: likes + 1 }));
    } catch (error) {
      console.log("🚀 ~ likePost ~ error:", error);
      toast.error(error.response?.data?.message || "Error while liking post", {
        id: likeToast,
      });
    }
  };

  const unlikePost = async () => {
    const unlikeToast = toast.loading("Unliking Post...");

    try {
      const response = await unlikeBlogPost(_id);

      console.log("🚀 ~ unlikePost ~ response:", response);

      toast.success("Unliked Post successfully.", { id: unlikeToast });
      setPost((prev) => ({ ...prev, isLiked: false, likes: likes - 1 }));
    } catch (error) {
      console.log("🚀 ~ likePost ~ error:", error);
      toast.error(
        error.response?.data?.message || "Error while unliking post",
        {
          id: unlikeToast,
        }
      );
    }
  };

  return (
    <div className="flex gap-2 p-5">
      {isLiked ? (
        <FaHeart
          className="w-7 h-7 fill-red-600 cursor-pointer"
          onClick={unlikePost}
        />
      ) : (
        <FaRegHeart className="w-7 h-7 cursor-pointer" onClick={likePost} />
      )}{" "}
      <p className="text-lg font-bold">{likes}</p>
    </div>
  );
}

export default LikeBtn;
