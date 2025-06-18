import { describe, it, expect } from "vitest";
import { UserSuspension } from "./userSuspension";

describe("UserSuspension", () => {
  const future = (offsetMonth: number) => {
    const now = new Date();
    now.setMonth(now.getMonth() + offsetMonth);
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  };

  it("should create a UserSuspension with valid future dates and 3 months or less", () => {
    const from = future(1);
    const until = future(2);
    const userId = "user-1";
    const suspension = UserSuspension.create({ userId, from, until });
    expect(suspension).toBeInstanceOf(UserSuspension);
  });

  it("should use provided id if given", () => {
    const from = future(1);
    const until = future(2);
    const userId = "user-2";
    const id = "custom-id";
    const suspension = UserSuspension.create({ userId, from, until, id });
    expect(suspension).toBeInstanceOf(UserSuspension);
  });

  it("should throw if from is today or in the past", () => {
    const now = new Date();
    const from = { year: now.getFullYear(), month: now.getMonth() + 1 };
    const until = future(2);
    expect(() =>
      UserSuspension.create({ userId: "user-3", from, until }),
    ).toThrow("Suspension start date must be in the future.");
  });

  it("should throw if until is before or same as from", () => {
    const from = future(2);
    const until = future(1);
    expect(() =>
      UserSuspension.create({ userId: "user-4", from, until }),
    ).toThrow("Suspension end date must be after the start date.");
    expect(() =>
      UserSuspension.create({ userId: "user-4", from, until: from }),
    ).toThrow("Suspension end date must be after the start date.");
  });

  it("should throw if suspension period exceeds 3 months", () => {
    const from = future(1);
    const until = future(5);
    expect(() =>
      UserSuspension.create({ userId: "user-5", from, until }),
    ).toThrow("Suspension period cannot exceed 3 months.");
  });
});
