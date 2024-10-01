import { useEffect, useState } from "react";
import { BlogCard, Container } from "../components";
import { getPosts } from "../api/index.js";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="mt-8">
        <Container>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl bg-neutral-200 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-400/80"></div>

                  <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-400/80"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
              </div>
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl bg-neutral-200 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-400/80"></div>

                  <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-400/80"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
              </div>
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl bg-neutral-200 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-400/80"></div>

                  <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-400/80"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
              </div>
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl bg-neutral-200 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-400/80"></div>

                  <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-400/80"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-neutral-400/80"></div>
              </div>
            </div>
          ) : posts.length == 0 ? (
            <div className="border-2 border-black/50 p-4 rounded-2xl font-bold text-3xl text-center">
              <h1>No Post Found</h1>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {posts.map((post) => (
                <div key={post._id} className="mb-4">
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default Home;