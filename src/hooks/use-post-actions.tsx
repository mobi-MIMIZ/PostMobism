import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import { FormEvent } from "react"
import { RootState } from "@/features/store"
import { deletePost, editPost, getPosts, postPost } from "@/features/post/post.slice"

export const usePostActions = () => {
  const dispatch: ThunkDispatch<RootState, object, AnyAction> = useDispatch()

  // create post
  const handleCreatePost = async (e: FormEvent<HTMLFormElement>, title: string, content: string) => {
    e.preventDefault()
    const newPostData: { title: string; content: string } = {
      title,
      content,
    }

    try {
      await dispatch(postPost(newPostData))
      alert("게시글이 성공적으로 등록되었습니다.")
      await dispatch(getPosts())
    } catch (error) {
      alert("죄송합니다, 게시글 등록에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  // update post
  const handleEditPost = async ({ id, title, content }: { id: string; title?: string; content?: string }) => {
    try {
      await dispatch(editPost({ post: { title, content }, postId: id }))
      alert("게시글이 성공적으로 수정되었습니다.")
      await dispatch(getPosts())
    } catch (error) {
      alert("죄송합니다, 게시글 수정에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  // delete post
  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deletePost(postId))
      await dispatch(getPosts())
      alert("게시글이 성공적으로 삭제되었습니다.")
    } catch (error) {
      alert("죄송합니다, 게시글 삭제에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  return {
    handleCreatePost,
    handleEditPost,
    handleDeletePost,
  }
}
