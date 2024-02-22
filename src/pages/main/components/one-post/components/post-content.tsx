import MMZbutton from "@/components/mmz-button"
import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { FC, FormEvent, ChangeEvent } from "react"
import { ImagePlus, X } from "lucide-react"
import styled from "styled-components"
import { usePostActions } from "@/hooks/use-post-actions"
import { useSearchParams } from "react-router-dom"
import { useImageActions } from "@/hooks/use-upload-images"

const PostContent: FC = () => {
  const { hasImage, showImages, uploadImage, deleteImage } = useImageActions()
  const [searchParam] = useSearchParams()

  const page = searchParam.get("page") ?? "1"

  const { handleCreatePost } = usePostActions({
    pageParams: parseInt(page),
  })

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files as FileList
    uploadImage(imageLists)
  }

  const onDeleteImage = (index: number) => {
    deleteImage(index)
  }

  const onSubmitCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      await handleCreatePost(formData)
    } catch (error) {
      alert("게시글을 등록하지 못했습니다! 잠시 후 다시 시도해주세요.")
      console.error("게시글 등록 중 에러 발생:", error)
    }
  }

  return (
    <S.Container onSubmit={onSubmitCreatePost}>
      <S.Title type="text" name="title" placeholder="what's the topic?" />
      <S.Content name="content" placeholder="share your code with mobi" />
      {hasImage && (
        <S.PreviewImages>
          {showImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Preview ${index}`} />
              <X color="#ecb996" size={16} onClick={() => onDeleteImage(index)} />
            </div>
          ))}
        </S.PreviewImages>
      )}
      <S.Label htmlFor="file">
        <div>add image</div>
        <ImagePlus color="#ecb996" size={28} />
      </S.Label>
      <S.AddImage type="file" name="images" id="file" multiple accept="image/*" onChange={onUploadImage} />
      <MMZbutton usage={"PostForm"} type={"submit"} label={"POST"} />
    </S.Container>
  )
}
export default PostContent

const Container = styled.form`
  height: 80%;
  margin-top: 6%;
  ${flexAlignCenter}
  justify-content: space-around;
  flex-direction: column;
`
const Title = styled.input`
  width: 540px;
  height: 60px;
  padding-left: 30px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 6px;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.beige[500]};
    font-size: ${({ theme }) => theme.FONT_SIZE.large};
  }
`
const Content = styled.textarea`
  padding: 10px 30px;
  width: 540px;
  height: 360px;
  ${flexCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  resize: none;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 6px;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.beige[500]};
    font-size: ${({ theme }) => theme.FONT_SIZE.large};
  }
`
const AddImage = styled.input`
  display: none;
`
const Label = styled.label`
  width: 540px;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  color: ${({ theme }) => theme.COLORS.beige[500]};
  ${flexAlignCenter}
  justify-content: space-between;
  padding: 0 30px;
  margin: 10px 0;
`
const PreviewImages = styled.div`
  ${flexCenter}
  width: 670px;
  height: 120px;
  overflow: hidden;
  margin: 2% 0;

  & > div {
    width: 100px;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 10px;

    & > img {
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
    & > svg {
      position: relative;
      right: -80%;
      top: -95%;
      transition: all 0.6s;
      border-radius: 50%;
      &:hover {
        background-color: ${({ theme }) => theme.COLORS.primary["pink"]};
      }
    }
  }
`

const S = {
  Container,
  Title,
  Content,
  AddImage,
  Label,
  PreviewImages,
}
