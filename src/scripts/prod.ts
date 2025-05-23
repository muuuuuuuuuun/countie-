import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Basic Numbers", imageSrc: "/math.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Keep going! Learn more of the ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Knowing Numbers", order: 1 },
            { unitId: unit.id, title: "Counting Made Easy", order: 2 },
            { unitId: unit.id, title: "Numbers! Numbers~", order: 3 },
            { unitId: unit.id, title: "One, Two , Tree", order: 4 },
            { unitId: unit.id, title: "Easyyyy~", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which number is greater?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which number is lesser?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '2 + 7 = ?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '4 + 4 =',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '2 + 3 = ?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which is the 50 sen coin?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What number comes after 2?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '9 + 1 = ?',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Six",
                  imageSrc: "/six.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Eight",
                  imageSrc: "/eight.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Seven",
                  imageSrc: "/seven.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Three",
                  imageSrc: "/three.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eight",
                  imageSrc: "/eight.svg",
                  audioSrc: "/es_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Four",
                  imageSrc: "/four.svg",
                  audioSrc: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Ten",
                  imageSrc: "/ten.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eight",
                  imageSrc: "/eightv2.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Nine",
                  imageSrc: "/nine.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "four",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Eight",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Six",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "One",
                  imageSrc: "/one.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Nine",
                  imageSrc: "/ninev2.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Five",
                  imageSrc: "/five.svg",
                  audioSrc: "/es_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "50 sen",
                  imageSrc: "/50sen.svg",
                  audioSrc: "/es_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "10 sen",
                  imageSrc: "/10sen.svg",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "20 sen",
                  imageSrc: "/20sen.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Three",
                  imageSrc: "/threev2.svg",
                  audioSrc: "/es_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Four",
                  imageSrc: "/fourv2.svg",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "One",
                  imageSrc: "/onev2.svg",
                  audioSrc: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eight",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Ten",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Six",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
