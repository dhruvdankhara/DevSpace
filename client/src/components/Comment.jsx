import axios from "axios";
import { useEffect, useState } from "react";
import { Button, CommentCard, Container, Input } from "./index";
import { createComment, getPostComments } from "../api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Comment({ _id, author }) {
  const [comments, setComments] = useState([{ content: "hello", _id: "dljn" }]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const loggedInUser = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      toast.error("Enter comment.");
      return;
    }

    if (!isLoggedIn) {
      toast.error("Login first to post comment");
      return;
    }

    const createCommentToast = toast.loading("uploading comment...");

    try {
      const response = await createComment({ blogId: _id, content });
      console.log("🚀 ~ comment post ~ response:", response);
      toast.success("Comment posted successfully", {
        id: createCommentToast,
      });
    } catch (error) {
      console.log("🚀 ~ comment post ~ error:", error);
      toast.error(
        error.response.data.message || "error while posting comment",
        {
          id: createCommentToast,
        }
      );
    }

    setContent("");
  };

  useEffect(() => {
    getPostComments(_id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("comment fetch error: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="border-2 border-black rounded-3xl flex flex-col gap-5 p-10 bg-white">
      <h1 className="text-4xl font-bold">Comments</h1>
      <form onSubmit={handleSubmit} className="flex gap-5">
        <img src={loggedInUser.avatar} className="rounded-full w-12" alt="" />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl w-full px-3.5 py-2.5"
          placeholder={"enter comment..."}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Button className={"w-36 rounded-xl"}>Post</Button>
      </form>

      {loading ? (
        <div className=" mx-auto size-12 border-[5px] border-gray-400 border-b-indigo-500 animate-spin rounded-full"></div>
      ) : (
        <div className="flex flex-col">
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentCard key={comment._id} {...comment} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
