import { Gender } from "@prisma/client";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const updateUserProfile: MutationResolvers["updateUserProfile"] = async (
    _,
    args,
    context
) => {

    try {
        const { firstName, lastName, profile } = args.input;

        const result = await context.client.$transaction(async (tx) => {
            // Update user basic details
            const user = await tx.user.update({
                where: { id: context.userId },
                data: {
                    firstName: firstName ?? undefined,
                    lastName: lastName ?? undefined,
                },
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            social: { select: { id: true } },
                        },
                    },
                },
            });

            // Defensive: ensure profile exists
            if (!user.profile) {
                throw new Error("User profile not found");
            }

            // Update user profile
            await tx.userProfile.update({
                where: { userId: context.userId },
                data: {
                    bio: profile?.bio ?? undefined,
                    avatar: profile?.avatar ?? undefined,
                    phone: profile?.phone ?? undefined,
                    gender: (profile?.gender as Gender) ?? undefined,
                },
            });

            // Update social if exists
            if (user.profile.social?.id) {
                await tx.social.update({
                    where: { id: user.profile.social.id },
                    data: {
                        linkedin: profile?.social?.linkedin ?? undefined,
                        twitter: profile?.social?.twitter ?? undefined,
                        github: profile?.social?.github ?? undefined,
                    },
                });
            }
            else if(args.input.profile?.social){
                console.log(args.input.profile.social);
                await tx.social.create({
                    data: {
                        twitter: args.input.profile?.social?.twitter,
                        github: args.input.profile?.social?.github,
                        linkedin: args.input.profile?.social?.linkedin,
                        facebook: args.input.profile?.social?.facebook,
                        userProfile: { connect: { id: user.profile.id } },
                    }
                });
            }

            return user;
        });

        return {
            message: "Profile updated successfully",
            success: true,
        };
    } catch (error) {
        console.error("UpdateUserProfile error:", error);
        return {
            message: error instanceof Error ? error.message : "Something went wrong",
            success: false,
        };
    }
};
