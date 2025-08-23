import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { act } from "react";
const client = new PrismaClient();

const data = [
  {
    user: {
      email: "adi123@gmail.com",
      firstName: "Adiraj",
      lastName: "Patil",
      password: "Adiraj1234",
      salt: generateSalt(),
      isVerified: true,
    },

    profile: {
      avatar: "image url",
    },

    project: {
      name: "Adiraj Project",
      key: "AP",
      description: "adi's new project for tesing",
      status: "ACTIVE",
    },
  },
  {
    user: {
      email: "kunal123@gmail.com",
      firstName: "Kunal",
      lastName: "Patil",
      password: "Kunal1234",
      salt: generateSalt(),
      isVerified: true,
    },

    profile: {
      avatar: "image url",
    },

    project: {
      name: "Kunal Project",
      key: "KP",
      description: "kunal's new project for tesing",
      status: "ACTIVE",
    },
  },
  {
    user: {
      email: "amol123@gmail.com",
      firstName: "Amol",
      lastName: "Patil",
      password: "amol1234",
      salt: generateSalt(),
      isVerified: true,
    },

    profile: {
      avatar: "image url",
    },

    project: {
      name: "Brother's Project",
      key: "AMP",
      description: "adi's new project for tesing",
      status: "ACTIVE",
    },
  },
  {
    user: {
      email: "suraj@gmail.com",
      firstName: "Suraj",
      lastName: "Patil",
      password: "suraj1234",
      salt: generateSalt(),
      isVerified: true,
    },

    profile: {
      avatar: "image url",
    },

    project: {
      name: "Suraj's Project",
      key: "SP",
      description: "adi's new project for tesing",
      status: "ACTIVE",
    },
  },
  {
    user: {
      email: "harshad123@gmail.com",
      firstName: "Harshad",
      lastName: "Patil",
      password: "harshad1234",
      salt: generateSalt(),
      isVerified: true,
    },

    profile: {
      avatar: "image url",
    },

    project: {
      name: "Baban's Project",
      key: "BBNP",
      description: "harshad's new project for tesing",
      status: "ACTIVE",
    },
  },
];

// Helpers
function generateSalt() {
  // 16 bytes hex salt
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  // pbkdf2 with sha512
  return crypto
    .pbkdf2Sync(password, salt, 100_000, 64, "sha512")
    .toString("hex");
}

export async function seedSampleData() {
  for (let d of data) {
    try {
      d.user.password = hashPassword(d.user.password, d.user.salt);
      //console.log({...d.user});

      await client.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            ...d.user,
          },
        });

        await prisma.userProfile.create({
          data: {
            ...d.profile,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        const project = await prisma.project.create({
          data: {
            ...d.project,
            creator: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        await prisma.activity.create({
          data: {
            action: "PROJECT_CREATED",
            entityType: "PROJECT",
            entityName: project.key,
            entityId: project.id,
            description: "new project created",
            userId: user.id,
          },
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}

seedSampleData()
  .then(() => client.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
