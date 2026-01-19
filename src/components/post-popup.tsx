import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { Post } from "../lib/types"

interface PostPopupProps {
  post: Post | null
  onClose: () => void
}

export function PostPopup({ post, onClose }: PostPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && post) {
        onClose()
      }
    }

    if (post) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      closeButtonRef.current?.focus()

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = originalOverflow
      }
    }
  }, [post, onClose])

  if (!post) return null

  return (
    <div
      className="post-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-popup-title"
    >
      <div ref={popupRef} className="post-popup">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="post-popup__close-btn"
          aria-label="Close detailed post view"
        >
          <X size={20} />
        </button>

        <div className="post-popup__image-container">
          <img
            src={post.img}
            srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
            alt={post.title}
            className="post-popup__image"
          />
        </div>

        <div className="post-popup__content">
          <h2 id="post-popup-title" className="post-popup__title">{post.title}</h2>

          <div className="post-popup__body">
            <p className="post-popup__text">{post.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
