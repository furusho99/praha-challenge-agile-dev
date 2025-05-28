// define user name validation schema
import { z } from "zod";

export const userNameSchema = (name: "姓" | "名") =>
  z
    .string()
    .min(1, `${name}は必須です`)
    .max(20, `${name}は20文字以内で入力してください`)
    .regex(
      /^[ぁ-んァ-ン一-龥a-zA-Z]+$/,
      `${name}は日本語とアルファベットのみ使用できます`,
    );
