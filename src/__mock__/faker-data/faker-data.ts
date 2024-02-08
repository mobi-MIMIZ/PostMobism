import { faker } from "@faker-js/faker"
import shortId from "shortid"

export const MockPostsData = (count: number) =>
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
            createdAt: faker.date.weekday(),
          }
        }),
      createdAt: faker.date.weekday(),
    }))

export const MockUserData = (count: number) =>
  Array(count)
    .fill(undefined)
    .map(() => ({
      id: shortId.generate(),
      nickName: faker.person.firstName(),
      profileImg: faker.image.url(),
    }))
