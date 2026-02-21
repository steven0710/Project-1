import z from "zod";

export const updateJobSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    company: z.string().trim().min(1).optional(),
    employmentType: z
      .enum(["full-time", "part-time", "contract", "internship"])
      .optional(),
    status: z.enum(["applied", "interviewing", "offer", "rejected"]).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
