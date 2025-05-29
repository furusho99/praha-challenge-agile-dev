import { describe, it, expect, vi } from "vitest";
import { User } from "./user";
import { userSchema } from "@/validations/userSchema";

vi.mock("@/validations/userSchema", () => ({
  userSchema: {
    parse: vi.fn((props) => props),
  },
}));

describe("User", () => {
  const validProps = {
    id: "user-1",
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    status: "ACTIVE" as const,
    season: 1,
  };

  it("should create a User instance with valid properties", () => {
    const user = User.create(validProps);

    expect(user.id).toBe(validProps.id);
    expect(user.email).toBe(validProps.email);
    expect(user.firstName).toBe(validProps.firstName);
    expect(user.lastName).toBe(validProps.lastName);
    expect(user.status).toBe(validProps.status);
    expect(user.season).toBe(1);
  });

  it("should throw if userSchema.parse throws", () => {
    const invalidProps = {
      id: "user-2",
      email: "invalid-email",
      firstName: "Jane",
      lastName: "Doe",
      status: "ACTIVE" as const,
      season: 1,
    };

    (userSchema.parse as ReturnType<typeof vi.fn>).mockImplementationOnce(
      () => {
        throw new Error("Validation error");
      },
    );

    expect(() => User.create(invalidProps)).toThrow("Validation error");
  });
});
