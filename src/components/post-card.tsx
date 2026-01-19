import { memo, useState } from "react"
import type { Post } from "../lib/types"

interface PostCardProps {
  post: Post
  onClick: () => void
}

export const PostCard = memo(function PostCard({ post, onClick }: PostCardProps) {
  const [imgError, setImgError] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <article
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View post: ${post.title}`}
      className="post-card"
    >
      <div className="post-card__image-container">
        <img
          src={imgError ? "/placeholder.svg" : (post.img || "/placeholder.svg")}
          srcSet={imgError ? undefined : `${post.img} 1x, ${post.img_2x} 2x`}
          alt={`${post.title} - Featured image`}
          className="post-card__image"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>

      <div>
        <div className="post-card__tag">{post.tags}</div>

        <h2 className="post-card__title">{post.title}</h2>

        <div className="post-card__meta">
          <span className="post-card__author">{post.autor}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.views} Views</span>
        </div>

        <p className="post-card__description">{post.text}</p>
      </div>
    </article>
  )
})
