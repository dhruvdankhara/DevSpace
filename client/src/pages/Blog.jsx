import { useEffect, useState } from "react";
import { Container, BlogPost, Comment } from "../components/index";
import { useParams } from "react-router-dom";
import { getPost, getUserProfile } from "../api";
import toast from "react-hot-toast";

function Blog() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    // getPost(slug).then((response) => {
    //   setPost(response.data);
    //   setLoading(false);
    // });

    // getUserProfile(post.author.username).then((response) => {
    //   console.log(response);
    //   setPost((prev) => ({ ...prev, author: response.data }));
    // });

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
          <p>Loading...</p>
        ) : (
          <>
            <BlogPost {...post} />
          </>
        )}
      </Container>
    </div>
  );
}

export default Blog;
