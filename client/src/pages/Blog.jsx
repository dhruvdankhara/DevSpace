import { useEffect, useState } from "react";
import { Container, BlogPost, Comment } from "../components/index";
import { useParams } from "react-router-dom";
import { getPost } from "../api";

function Blog() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPost(slug).then((response) => {
      setPost(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <BlogPost {...post} />
            <Comment {...post} />
          </>
        )}
      </Container>
    </div>
  );
}

export default Blog;
