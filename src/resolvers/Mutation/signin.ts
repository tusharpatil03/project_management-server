import { MutationResolvers } from '../../types/generatedGraphQLTypes'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../../utility/auth'

export const signin: MutationResolvers['signin'] = async (_, args, context) => {
  console.log(args.input)
  const user = await context.client.user.findUnique({
    where: { email: args.input.email },
  })
  if (!user) {
    throw new Error('User Does not Exists')
  }

  const hashedPassword = await bcrypt.hash(args.input.password, user.salt)

  if (hashedPassword !== user.password) {
    throw new Error('Wrong Password')
  }

  const accessToken = createAccessToken(user)

  delete user.hashedPassword
  delete user.salt

  return {
    accessToken,
  }
}
