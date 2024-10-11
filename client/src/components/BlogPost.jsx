import { Button, Comment, LikeBtn } from "./index";
import { useSelector } from "react-redux";
import { deletePost, getUserProfile } from "../api/index";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import toast from "react-hot-toast";
import { useEffect } from "react";

function BlogPost({
  title,
  featureImage,
  content,
  author,
  _id,
  createdAt,
  slug,
  visits,
  isLiked,
  likes,
  setPost,
  posts,
  comments,
}) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()]; // Get month name
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

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

  useEffect(() => {
    getUserProfile(author.username).then((response) => {
      console.log(response);
      author = response.data;
    });
  }, []);

  return (
    <div className="my-5">
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
            <FaRegEye className="w-5 h-5" />{" "}
            <p>
              <span className="font-semibold">{visits}</span> views
            </p>
          </p>
          <p className="text-lg text-slate-800 font-semibold">
            {formatDate(createdAt)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-1 md:col-span-2">
            <div className="flex border-t-2 border-b-2 border-slate-400 mb-5">
              <LikeBtn {...{ _id, isLiked, likes }} setPost={setPost} />
              <a href="#comments" className="flex gap-2 p-5">
                <MdOutlineComment className="w-7 h-7" />
                <p className="text-lg font-bold">{comments}</p>
              </a>
            </div>
            <img
              className="mx-auto rounded-2xl"
              src={featureImage}
              alt={title}
            />
            <pre className="text-lg text-wrap font-sans">{content}</pre>

            <Comment
              {...{ title, featureImage, content, author, _id, slug, visits }}
            />
          </div>
          <div className="col-span-1">
            <div className="border-2 border-black/50 p-5 rounded-2xl flex flex-col gap-4">
              <p className="text-slate-700">Author</p>
              <Link
                to={`/u/${author.username}`}
                className="flex items-center gap-4"
              >
                <img
                  className="w-12 h-12 rounded-2xl object-cover"
                  src={author.avatar}
                  alt=""
                />
                <div>
                  <p className="font-bold">{author.name}</p>
                  <p className="font-light">@{author.username}</p>
                </div>
              </Link>
              <div>
                <div className="flex text-center gap-5">
                  <p>
                    <span className="font-bold">{author.posts}</span>
                    <br />
                    Posts
                  </p>
                  <p>
                    <span className="font-bold">{author.followers}</span>
                    <br />
                    Followers
                  </p>
                  <p>
                    <span className="font-bold">{author.following}</span>
                    <br />
                    Following
                  </p>
                </div>
              </div>
              {/* // TODO: author topics */}
              {/* <div>
                <p></p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
