import { Button } from "./index";
import { useSelector } from "react-redux";
import { deletePost } from "../api/index";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";

function BlogPost({ title, featureImage, content, author, _id, slug, visits }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleDeletePost = () => {
    const deleteBlogToast = toast.loading("Deleting Blog Post");

    deletePost(slug)
      .then((response) => {
        console.log(response);
        toast.success("Blog Post deleted successfully.", {
          id: deleteBlogToast,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error while deleting blog post.", {
          id: deleteBlogToast,
        });
      });
  };

  return (
    <div className="border-2 border-black rounded-3xl p-10 my-5 bg-white">
      <div className="flex flex-col gap-8">
        {author._id == user._id ? (
          <div className="flex items-center gap-4 border-2 border-black/50 p-4 rounded-3xl">
            <Button
              onClick={() => navigate(`/blog/edit/${slug}`)}
              className="rounded-xl"
            >
              Edit
            </Button>
            <Button
              onClick={handleDeletePost}
              className="bg-red-600 rounded-xl hover:bg-red-900"
            >
              Delete
            </Button>
            <p className="text-slate-600">*This button only display to you.</p>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col gap-4 ">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="flex justify-start items-center gap-2">
            <FaRegEye className="w-5 h-5" /> {visits} views
          </p>
        </div>
        <Link
          to={`/u/${author.username}`}
          className="border-2 border-black/50 p-4 rounded-2xl flex items-center gap-4"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={author.avatar}
            alt=""
          />
          <p>{author.username}</p>
        </Link>
        <img
          className="max-w-3xl mx-auto rounded-2xl"
          src={featureImage}
          alt={title}
        />
        <pre className="text-lg text-wrap font-sans">{content}</pre>
      </div>
    </div>
  );
}

export default BlogPost;
