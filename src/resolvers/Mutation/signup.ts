import {
  MutationResolvers,
} from "../../types/generatedGraphQLTypes";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../utility/auth";

export const signup: MutationResolvers["signup"] = async (
  _,
  args,
  context
) => {
  const existingUser = await context.client.user.findUnique({
    where: { email: args.input.email },
  });
  if (existingUser) {
    throw new Error("User already Exists");
  }

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(args.input.password, salt);
  console.log(hashedPassword);

  const user = await context.client.user.create({
    data: {
      email: args.input.email,
      password: hashedPassword,
      role: args.input.role,
      salt: salt,
    },
  });

  const accessToken = createAccessToken(user);

  delete user.hashedPassword;
  delete user.salt;

  if (!user) {
    throw new Error("unable to create user");
  }

  console.log(user.id);

  return {
    accessToken,
  };
};
