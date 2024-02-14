import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import { FormEvent } from "react"
import { RootState } from "@/features/store"
import { Post } from "@/type/type"
import { deletePost, editPost, postPost } from "@/features/post/post.slice"
import { useAppSelector } from "./use-redux-toolkit"

export const usePostActions = () => {
  const dispatch: ThunkDispatch<RootState, object, AnyAction> = useDispatch()
  const posts = useAppSelector(state => state.post.data) as Post[]

  // create post
  const handleCreatePost = async (
    e: FormEvent<HTMLFormElement>,
    title: string,
    content: string,
    hasImage: boolean,
    showImages: string[],
  ) => {
    e.preventDefault()

    const currentUser = {
      id: "003",
      nickName: "John Doe",
      profileImg: "",
    }

    const newPostData: Post = {
      id: Math.floor(Math.random() * 100000).toString(), // random id number
      title,
      content,
      User: currentUser,
      createdAt: new Date().toISOString(),
    }

    if (hasImage) {
      newPostData.Post_img = showImages
    }

    try {
      const resultAction = await dispatch(postPost(newPostData))
      const updatedPost = postPost.fulfilled.match(resultAction) ? resultAction.payload : null

      if (updatedPost) {
        const updatedPostList = [updatedPost, ...posts]
        localStorage.setItem("postList", JSON.stringify(updatedPostList))
        alert("게시글이 성공적으로 등록되었습니다.")
      }
    } catch (error) {
      alert("죄송합니다, 게시글 등록에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  // update post
  const handleEditPost = async (editedPost: Post) => {
    try {
      const resultAction = await dispatch(editPost({ post: editedPost, postId: editedPost.id }))
      const updatedPost = editPost.fulfilled.match(resultAction) ? resultAction.payload : null

      if (updatedPost) {
        const updatedPostList = posts.map(post => (post.id === updatedPost.id ? updatedPost : post))
        localStorage.setItem("postList", JSON.stringify(updatedPostList))
        alert("게시글이 성공적으로 수정되었습니다.")
      }
    } catch (error) {
      alert("죄송합니다, 게시글 수정에 실패했습니다. 나중에 다시 시도해주세요.")
    }
  }

  // delete post
  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deletePost(postId))
      const updatedPostList = posts.filter(post => post.id !== postId)
      localStorage.setItem("postList", JSON.stringify(updatedPostList))
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
