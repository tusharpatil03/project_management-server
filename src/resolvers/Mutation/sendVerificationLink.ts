import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import { emailVerificationToken, sendVerificationEmail } from "../../utility/auth";

export const sendVerificationLink: MutationResolvers["sendVerificationLink"] = async (_, args) => {

    try {
        const token = emailVerificationToken(args.email);

        sendVerificationEmail(token, args.email);

        return {
            message: "Email Send Successful",
            success: true,
            status: 200
        }
    } catch (e) {
        console.log(e);
        return {
            message: "Failed to send Email",
            success: false,
            status: 500
        }
    }
}