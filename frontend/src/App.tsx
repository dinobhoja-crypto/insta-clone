import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/Layout";
import FeedPost from "./components/FeedPost";

interface Post {
  id: number;
  username: string;
  image_url: string;
  caption: string;
  created_at: string;
}

const fallbackPosts: Post[] = [
  {
    id: 1,
    username: "alexr",
    image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    caption: "Morning light in the mountains.",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    username: "marina",
    image_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    caption: "Coffee + a good book.",
    created_at: new Date().toISOString(),
  },
];

const App = () => {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>("http://localhost:8000/posts/");
        setPosts(response.data);
      } catch (error) {
        setPosts(fallbackPosts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <FeedPost
            key={post.id}
            username={post.username}
            imageUrl={post.image_url}
            caption={post.caption}
            timeLabel="2 hours ago"
          />
        ))}
      </div>
    </Layout>
  );
};

export default App;
