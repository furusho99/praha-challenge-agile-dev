import { describe, it, expect } from "vitest";
import {
  Assignment,
  CreateAssignmentData,
} from "@/domain/assignments/assignmentTypes";

describe("Assignment", () => {
  describe("create", () => {
    it("正常なパラメータで課題エンティティを作成できる", () => {
      // Arrange
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";

      // Act
      const assignment = Assignment.create(title, genre, description);

      // Assert
      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.title).toBe(title);
      expect(assignment.genre).toBe(genre);
      expect(assignment.description).toBe(description);
    });

    it("空のタイトルでエラーを投げる", () => {
      // Arrange
      const title = "";
      const genre = "テスト";
      const description = "これはテスト用の課題です";

      // Act & Assert
      expect(() => {
        Assignment.create(title, genre, description);
      }).toThrow("バリデーションエラー");
    });

    it("長すぎるタイトルでエラーを投げる", () => {
      // Arrange
      const title = "a".repeat(101); // 101文字のタイトル
      const genre = "テスト";
      const description = "これはテスト用の課題です";

      // Act & Assert
      expect(() => {
        Assignment.create(title, genre, description);
      }).toThrow("バリデーションエラー");
    });
  });
});

describe("CreateAssignmentData", () => {
  describe("create", () => {
    it("正常なパラメータで作成データを生成できる", () => {
      // Arrange
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";

      // Act
      const createData = CreateAssignmentData.create(title, genre, description);

      // Assert
      expect(createData).toBeInstanceOf(CreateAssignmentData);
    });

    it("空のタイトルでエラーを投げる", () => {
      // Arrange
      const title = "";
      const genre = "テスト";
      const description = "これはテスト用の課題です";

      // Act & Assert
      expect(() => {
        CreateAssignmentData.create(title, genre, description);
      }).toThrow("バリデーションエラー");
    });

    it("空のジャンルでエラーを投げる", () => {
      // Arrange
      const title = "テスト課題";
      const genre = "";
      const description = "これはテスト用の課題です";

      // Act & Assert
      expect(() => {
        CreateAssignmentData.create(title, genre, description);
      }).toThrow("バリデーションエラー");
    });

    it("空の説明でエラーを投げる", () => {
      // Arrange
      const title = "テスト課題";
      const genre = "テスト";
      const description = "";

      // Act & Assert
      expect(() => {
        CreateAssignmentData.create(title, genre, description);
      }).toThrow("バリデーションエラー");
    });
  });
});
