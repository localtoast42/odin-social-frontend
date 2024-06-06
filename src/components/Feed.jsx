import Post from "./Post";
import NewPost from "./NewPost";
import { useLoaderData } from "react-router-dom";

function Feed() {
  const { posts } = useLoaderData();

  return (
    <div className="grow max-w-xl py-8">
      <div>
        <NewPost></NewPost>
      </div>
      <div className="mt-4 flex flex-col divide-y divide-gray-300">
        {posts.map(post => <Post
          key={post.id}
          post={post} />
        )}
      </div>
    </div>
  )
}

export default Feed