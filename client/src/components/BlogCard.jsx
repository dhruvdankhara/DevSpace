import { Link } from "react-router-dom";

function BlogCard({ _id, title, featureImage, author, createdAt, slug }) {
  const postDate =
    Math.round((new Date() - new Date(createdAt)) / (1000 * 3600 * 24)) > 1
      ? `${Math.round(
          (new Date() - new Date(createdAt)) / (1000 * 3600 * 24)
        )}d`
      : `${Math.round((new Date() - new Date(createdAt)) / (1000 * 3600))}h`;

  return (
    <Link to={`/blog/${slug}`}>
      <div className="flex h-full flex-col justify-between gap-5 rounded-3xl border-2 bg-white p-5 transition-all duration-300 hover:border-black">
        <div className="flex items-center gap-4">
          <img
            src={author.avatar}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-sm">{author.username}</h3>
            <p className="text-xs opacity-75">{postDate}</p>
          </div>
        </div>
        <div className="text-3xl font-bold">{title}</div>
        <div>
          <img
            src={featureImage}
            alt=""
            className="h-48 w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
