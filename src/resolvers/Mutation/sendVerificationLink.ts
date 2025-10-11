import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import { emailVerificationToken, sendVerificationEmail } from "../../utility/auth";

export const sendVerificationLink: MutationResolvers["sendVerificationLink"] = async (_, args) => {

    try {
        await sendVerificationEmail(args.email);

    } catch (e) {
        throw new Error("Failed to send Email");
    }

    return {
        message: "Email Send Successful",
        success: true,
        status: 200
    }
}