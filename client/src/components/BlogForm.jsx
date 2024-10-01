import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";
import { Container, Button } from "./index";

function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSlug(title.trim().split(" ").join("-"));
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Enter Title.");
      return;
    }

    if (!content.trim()) {
      toast.error("Enter Blog Content");
      return;
    }

    const postingToast = toast.loading("Uploading blog post..");
    setIsPosting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("featureImage", image);

    try {
      const response = await createPost(formData);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      toast.success("Blog post Uploaded successfully.", {
        id: postingToast,
      });
      setIsPosting(false);
      navigate(`/blog/${response.data.slug}`);
    } catch (error) {
      console.log(error);
      toast.error("Error in blog post uploading.", {
        id: postingToast,
      });
      setIsPosting(false);
    }
  };

  return (
    <div className="my-10">
      <Container>
        <div className="border-2 flex justify-center px-10 border-black rounded-3xl">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl w-full py-10 flex flex-col gap-5"
          >
            {/* title */}
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="Title"
                className="text-lg font-medium text-gray-900 "
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 "
                placeholder="Enter Title"
                value={title}
                required=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* slug */}
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="slug"
                className="text-lg font-medium text-gray-900 "
              >
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                className="w-full text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 "
                placeholder="Enter slug"
                value={slug}
                required=""
              />
            </div>

            {/* feature image */}
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="featureImage"
                className="text-lg font-medium text-gray-900 "
              >
                Feature Image
              </label>
              {image ? (
                <img
                  className="rounded-lg"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              ) : (
                ""
              )}
              <input
                className="w-full text-lg text-gray-900 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="featureImage"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* content */}
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="content"
                className="text-lg font-medium text-gray-900 "
              >
                Content
              </label>
              <textarea
                className="p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                rows="14"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here..."
                name="content"
                id="content"
              ></textarea>
            </div>

            {/* Button */}
            <div className="self-center">
              <Button type="submit" className="rounded-xl text-2xl px-14 py-3">
                {isPosting ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-e-blue-700"></div>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
export default BlogForm;
