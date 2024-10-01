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
      <div className="flex flex-col justify-between gap-5 border-2 p-5 rounded-3xl h-full bg-white transition-all duration-300 hover:border-black">
        <div className="flex items-center gap-4">
          <img
            src={author.avatar}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
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
            className="rounded-2xl w-full h-48 object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
