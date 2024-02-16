import MMZbutton from "@/components/mmz-button"
import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react"
import { ImagePlus, X } from "lucide-react"
import styled from "styled-components"
import { usePostActions } from "@/hooks/use-post-actions"

const PostContent: FC = () => {
  // preview uploaded images
  const [hasImage, setHasImage] = useState(false)
  const [showImages, setShowImages]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([])

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files as FileList
    let imageUrlLists: string[] = [...showImages]

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i])
      imageUrlLists.unshift(currentImageUrl)
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5)
      alert("한 번에 이미지를 5개 이상 추가하실 수 없습니다.")
    }
    setHasImage(true)
    setShowImages([...imageUrlLists])
  }

  const onDeleteImage = (index: number) => {
    const deleteList = [...showImages]
    deleteList.splice(index, 1)
    setShowImages(deleteList)
    if (deleteList.length === 0) {
      setHasImage(false)
    }
  }

  const { handleCreatePost } = usePostActions()

  const onSubmitCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    try {
      await handleCreatePost(e, title, content)
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
      <S.AddImage type="file" name="file" id="file" multiple accept="image/*" onChange={onUploadImage} />
      <MMZbutton usage={"PostForm"} type={"submit"} label={"POST"} />
    </S.Container>
  )
}
export default PostContent

const Container = styled.form`
  height: 90%;
  ${flexCenter}
  flex-direction: column;
`
const Title = styled.input`
  width: 670px;
  height: 80px;
  margin: 20px 0;
  padding-left: 30px;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 6px;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.beige[500]};
    font-size: ${({ theme }) => theme.FONT_SIZE.large};
  }
`
const Content = styled.textarea`
  padding: 10px 30px;
  width: 670px;
  height: 440px;
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
  width: 670px;
  height: 90px;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  color: ${({ theme }) => theme.COLORS.beige[500]};
  ${flexAlignCenter}
  justify-content: space-between;
  padding: 0 30px;
  margin: 40px 0 20px;
`
const PreviewImages = styled.div`
  ${flexCenter}
  width: 670px;
  height: 120px;
  overflow: hidden;
  margin: 5% 0 0;

  & > div {
    width: 100px;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 1%;
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
