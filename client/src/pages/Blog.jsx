import { useEffect, useState } from "react";
import { Container, BlogPost, Comment } from "../components/index";
import { useParams } from "react-router-dom";
import { getPost, getUserProfile } from "../api";

function Blog() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      const postResponse = await getPost(slug);
      console.log("🚀 ~ postResponse:", postResponse);

      const userResponse = await getUserProfile(
        postResponse.data.author.username
      );
      console.log("🚀 ~ userResponse:", userResponse);

      setPost({ ...postResponse.data, author: userResponse.data });

      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <Container>
        {loading ? (
          <p className="text-center text-xl font-bold">Loading...</p>
        ) : (
          <>
            <BlogPost {...post} setPost={setPost} />
          </>
        )}
      </Container>
    </div>
  );
}

export default Blog;
