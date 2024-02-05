import { faker } from "@faker-js/faker"
import shortId from "shortid"

type User = {
  id: string
  nickName: string
  profileImg: string
}

type Post = {
  id: string
  title: string
  content: string
  User: User
  Post_img: string[]
  createdAt: Date
}

export const MockPostsData = (count: number): Post[] =>
  Array(count)
    .fill(undefined)
    .map(() => ({
      id: shortId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      User: {
        id: shortId.generate(),
        nickName: faker.person.firstName(),
        profileImg: faker.image.url(),
      },
      Post_img: Array(Math.floor(Math.random() * 5) + 1)
        .fill(undefined)
        .map(() => faker.image.url()),
      Comments: Array(Math.floor(Math.random() * 40) + 1)
        .fill(undefined)
        .map(() => {
          return {
            id: shortId.generate(),
            content: faker.lorem.sentence(),
            User: {
              id: shortId.generate(),
              nickName: faker.person.firstName(),
              profileImg: faker.image.url(),
            },
            createdAt: faker.date.between("2023-01-01T00:00:00.000Z", "2023-01-31T00:00:00.000Z"),
          }
        }),
      createdAt: faker.date.between("2023-01-01T00:00:00.000Z", "2023-01-31T00:00:00.000Z"),
    }))

export const MockUserData = (count: number): User[] =>
  Array(count)
    .fill(undefined)
    .map(() => ({
      id: shortId.generate(),
      nickName: faker.person.firstName(),
      profileImg: faker.image.url(),
    }))
