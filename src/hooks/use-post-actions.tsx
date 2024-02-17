import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import { RootState } from "@/features/store"
import { deletePost, editPost, getPosts, postPost } from "@/features/post/post.slice"

export const usePostActions = ({ pageParams = 0 }: { pageParams?: number }) => {
  const dispatch: ThunkDispatch<RootState, object, AnyAction> = useDispatch()

  // read post
  const fetchPosts = async () => {
    try {
      await dispatch(getPosts(pageParams))
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  // create post
  const handleCreatePost = async (formData: FormData) => {
    try {
      await dispatch(postPost({ formData }))
      alert("게시글이 성공적으로 등록되었습니다.")
      await dispatch(getPosts(pageParams))
    } catch (error) {
      alert("죄송합니다, 게시글 등록에 실패했습니다. 나중에 다시 시도해주세요.")
      console.error("게시글 등록 중 에러 발생:", error)
    }
  }

  // update post
  const handleEditPost = async ({ id, title, content }: { id: string; title?: string; content?: string }) => {
    try {
      await dispatch(editPost({ post: { title, content }, postId: id }))
      alert("게시글이 성공적으로 수정되었습니다.")
      await dispatch(getPosts(pageParams))
    } catch (error) {
      alert("죄송합니다, 게시글 수정에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  // delete post
  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deletePost(postId))
      await dispatch(getPosts(pageParams))
      alert("게시글이 성공적으로 삭제되었습니다.")
    } catch (error) {
      alert("죄송합니다, 게시글 삭제에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  return {
    fetchPosts,
    handleCreatePost,
    handleEditPost,
    handleDeletePost,
  }
}
