import { useState, useEffect, useMemo, useCallback } from "react"
import type { Post } from "./lib/types"
import { Header } from "./components/header"
import { HeroSection } from "./components/hero-section"
import { PostsGrid } from "./components/posts-grid"
import { PostPopup } from "./components/post-popup"
import { useDebounce } from "./hooks/useDebounce"
import { API_ENDPOINT } from "./constants/api"
import "./index.css"

export default function App() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    const debouncedSearchQuery = useDebounce(searchQuery, 300)

    const fetchPosts = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(API_ENDPOINT)
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Posts not found. Please check the API endpoint.")
                } else if (response.status >= 500) {
                    throw new Error("Server error. Please try again later.")
                } else {
                    throw new Error("Failed to fetch posts")
                }
            }
            const data = await response.json()
            setPosts(data)
        } catch (err) {
            if (err instanceof TypeError && err.message.includes('fetch')) {
                setError("Unable to connect. Please check your internet connection.")
            } else if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unexpected error occurred. Please try again.")
            }
            console.error("Fetch error:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const abortController = new AbortController()

        const loadPosts = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(API_ENDPOINT, {
                    signal: abortController.signal
                })
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Posts not found. Please check the API endpoint.")
                    } else if (response.status >= 500) {
                        throw new Error("Server error. Please try again later.")
                    } else {
                        throw new Error("Failed to fetch posts")
                    }
                }
                const data = await response.json()
                if (!abortController.signal.aborted) {
                    setPosts(data)
                }
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return
                }
                if (err instanceof TypeError && err.message.includes('fetch')) {
                    setError("Unable to connect. Please check your internet connection.")
                } else if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("An unexpected error occurred. Please try again.")
                }
                console.error("Fetch error:", err)
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        loadPosts()

        return () => {
            abortController.abort()
        }
    }, [])

    const filteredPosts = useMemo(() => {
        if (!debouncedSearchQuery.trim()) return posts

        const query = debouncedSearchQuery.toLowerCase()
        return posts.filter((post) =>
            post.title.toLowerCase().includes(query) ||
            post.text.toLowerCase().includes(query)
        )
    }, [posts, debouncedSearchQuery])

    const handlePostClick = useCallback((post: Post) => {
        setSelectedPost(post)
    }, [])

    const handleClosePopup = useCallback(() => {
        setSelectedPost(null)
    }, [])

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query)
    }, [])

    return (
        <div className="app-container">
            <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <HeroSection />
            <main className="main-content">
                {loading ? (
                    <div className="state-message">
                        <div className="loading-spinner" />
                    </div>
                ) : error ? (
                    <div className="state-message">
                        <p className="error-text">{error}</p>
                        <button
                            onClick={fetchPosts}
                            className="retry-button"
                            aria-label="Retry loading posts"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        {debouncedSearchQuery && (
                            <p className="search-results-info">
                                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} matching "{debouncedSearchQuery}"
                            </p>
                        )}
                        <PostsGrid posts={filteredPosts} onPostClick={handlePostClick} />
                    </>
                )}
            </main>
            <PostPopup post={selectedPost} onClose={handleClosePopup} />
        </div>
    )
}
