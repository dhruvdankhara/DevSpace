import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuImage } from "react-icons/lu";
import { createPost } from "../api";
import { Container, Button, Input } from "./index";

function BlogForm() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const { handleSubmit, register, setValue, watch } = useForm();

  const featureImage = watch("featureImage");

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue("featureImage", e.target.files[0]);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", value.title.trim().split(" ").join("-"), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const submit = async ({ title, slug, content, featureImage }) => {
    const postingToast = toast.loading("Uploading blog post...");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("featureImage", featureImage);

    try {
      const response = await createPost(formData);
      console.log("🚀 ~ create post submit ~ response:", response);

      toast.success("Blog post Uploaded successfully.", {
        id: postingToast,
      });
      navigate(`/blog/${response.data.slug}`);
    } catch (error) {
      console.log("🚀 ~ create post submit ~ error:", error);

      toast.error(
        error.response?.data?.message || "Error in blog post uploading.",
        {
          id: postingToast,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold">Create a New Blog Post</h1>
          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <Input
              label="Title"
              placeholder="Enter your blog post title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="url-friendly-version-of-title"
              {...register("slug", { required: true })}
              disabled="true"
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="content"
                className="text-base font-medium capitalize text-gray-900"
              >
                Content
              </label>
              <textarea
                id="content"
                placeholder="Write your blog post content here"
                className="min-h-[200px] w-full rounded-xl border border-gray-300 p-2"
                {...register("content", { required: true })}
              ></textarea>
            </div>
            <div>
              <label htmlFor="featureImage">Feature Image</label>
              <div className="mt-1 flex items-center space-x-2">
                <Button
                  type="button"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  className="flex w-full items-center justify-center border border-gray-300 bg-white text-zinc-900 shadow-sm hover:bg-slate-200/70"
                >
                  <LuImage className="mr-2 h-4 w-4" />
                  {featureImage ? "Change Image" : "Upload Image"}
                </Button>

                {featureImage && (
                  <Button
                    type="button"
                    onClick={() => {
                      setValue("featureImage", null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="flex items-center justify-center border border-gray-300 bg-white text-zinc-900 shadow-sm hover:bg-slate-200/70"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                id="featureImage"
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              {featureImage && (
                <div className="rounded-xl border-2 px-5 py-3">
                  <p className="text-muted-foreground mt-2 text-sm">
                    Selected file: {featureImage.name}
                  </p>
                  <img
                    className="mx-auto h-96 w-5/6 rounded-lg bg-cover object-cover"
                    src={URL.createObjectURL(featureImage)}
                    alt=""
                  />
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="flex w-full items-center justify-center bg-zinc-800 hover:bg-zinc-900"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block size-6 animate-spin rounded-full border-4 border-e-slate-700"></span>
              ) : (
                "Publish Post"
              )}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default BlogForm;
