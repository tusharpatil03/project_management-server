import { User, UserRegisterInput } from "../../types/generatedGraphQLTypes";
import { client } from "../../db";

export const registerUser = async (
  parent: any,
  args: UserRegisterInput,
): Promise<User> => {
  const user: User = await client.user.create({
    data: {
      email: args.email,
      password: args.password,
      role: args.role,
      salt: "sdicjm"
    },
  });
  return user;
};
