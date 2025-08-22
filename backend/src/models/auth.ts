import { t } from "elysia";
import { UserSchema } from "./user";

const loginBodySchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});

const signupBodySchema = t.Object({
  name: t.String({ maxLength: 60, minLength: 1 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
  phone: t.String({ minLength: 7 }),
});

const loginResponseSchema = t.Object({
  message: t.String(),
  data: t.Object({
    user: t.Nullable(t.Omit(UserSchema, ['password'])),
    authToken: t.String(),
    refreshToken: t.String(),
  }),
});

const signupResponseSchema = t.Object({
  message: t.String(),
  data: t.Nullable(t.Object({
    user: t.Omit(UserSchema, ['password']),
  })),
});

export { loginBodySchema, signupBodySchema, loginResponseSchema, signupResponseSchema };