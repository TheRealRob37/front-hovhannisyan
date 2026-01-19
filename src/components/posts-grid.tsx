import { memo } from 'react';
import type { Post } from "../lib/types"
import { PostCard } from "./post-card"

interface PostsGridProps {
  posts: Post[]
  onPostClick: (post: Post) => void
}

export const PostsGrid = memo(function PostsGrid({ posts, onPostClick }: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="posts-grid--empty">
        <p>No posts found matching your criteria. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div key={post.id} className="posts-grid__item">
          <PostCard
            post={post}
            onClick={() => onPostClick(post)}
          />
        </div>
      ))}
    </div>
  )
})
