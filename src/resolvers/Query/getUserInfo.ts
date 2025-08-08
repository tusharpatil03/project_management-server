// import { QueryResolvers } from "../../types/generatedGraphQLTypes";

// export const getUserInfo: QueryResolvers['getUserInfo'] = async (_, __, context) => {
//     if(!context.userId){
//         return null;
//     }

//     const user = await context.client.user.findUnique({
//         where: {
//             id: context.userId,
//         },
//         select: {
//             id: true,
//             firstName: true,
//             lastName: true,
//             email: true,
//             profile: {
//                 select: {
//                     id: true,
//                     avatar: true
//                 }
//             },
//             createdAt: true,
//             updatedAt: true,
//             projects: {
//                 select: {
//                     id: true,
//                     key: true,
//                     name: true,
//                     description: true,
//                     status: true,
//                     createdAt: true,
//                     updatedAt: true,
//                     creator: {
//                         select: {

//                         }
//                     }
//                 }
//             },
//         }
//     })

// }