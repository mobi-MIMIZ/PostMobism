import { useState } from "react"

export const useImageActions = () => {
  const [hasImage, setHasImage] = useState(false)
  const [showImages, setShowImages] = useState<string[]>([])

  const uploadImage = (imageLists: FileList) => {
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

  const deleteImage = (index: number) => {
    const deleteList = [...showImages]
    deleteList.splice(index, 1)
    setShowImages(deleteList)

    if (deleteList.length === 0) {
      setHasImage(false)
    }
  }

  return { hasImage, showImages, uploadImage, deleteImage }
}
