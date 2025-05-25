import { describe, it, expect } from 'vitest';
import { Assignment, CreateAssignmentData } from '@/domain/assignments/assignmentTypes';

describe('Assignment', () => {
  describe('create', () => {
    it('正常なパラメータで課題エンティティを作成できる', () => {
      // Arrange
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      // Act
      const assignment = Assignment.create(
        id,
        title,
        genre,
        description
      );
      
      // Assert
      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.toJSON()).toEqual({
        id,
        title,
        genre,
        description
      });
    });
    
    it('不正なIDでエラーを投げる', () => {
      // Arrange
      const invalidId = "invalid-uuid";
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      // Act & Assert
      expect(() => {
        Assignment.create(
          invalidId,
          title,
          genre,
          description
        );
      }).toThrow("バリデーションエラー");
    });
    
    it('空のタイトルでエラーを投げる', () => {
      // Arrange
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const title = "";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      // Act & Assert
      expect(() => {
        Assignment.create(
          id,
          title,
          genre,
          description
        );
      }).toThrow("バリデーションエラー");
    });
    
    it('長すぎるタイトルでエラーを投げる', () => {
      // Arrange
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const title = "a".repeat(101); // 101文字のタイトル
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      // Act & Assert
      expect(() => {
        Assignment.create(
          id,
          title,
          genre,
          description
        );
      }).toThrow("バリデーションエラー");
    });
  });
  
  describe('equals', () => {
    it('同じIDの課題は等価と判定される', () => {
      // Arrange
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const assignment1 = Assignment.create(
        id,
        "課題1",
        "テスト",
        "説明1"
      );
      const assignment2 = Assignment.create(
        id,
        "課題2", // 異なるタイトル
        "開発", // 異なるジャンル
        "説明2" // 異なる説明
      );
      
      // Act & Assert
      expect(assignment1.equals(assignment2)).toBe(true);
    });
    
    it('異なるIDの課題は等価でないと判定される', () => {
      // Arrange
      const assignment1 = Assignment.create(
        "123e4567-e89b-12d3-a456-426614174000",
        "課題",
        "テスト",
        "説明"
      );
      const assignment2 = Assignment.create(
        "123e4567-e89b-12d3-a456-426614174001", // 異なるID
        "課題",
        "テスト",
        "説明"
      );
      
      // Act & Assert
      expect(assignment1.equals(assignment2)).toBe(false);
    });
  });
  
  describe('toJSON', () => {
    it('エンティティをJSONオブジェクトに変換できる', () => {
      // Arrange
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      const assignment = Assignment.create(
        id,
        title,
        genre,
        description
      );
      
      // Act
      const json = assignment.toJSON();
      
      // Assert
      expect(json).toEqual({
        id,
        title,
        genre,
        description
      });
    });
  });
});

describe('CreateAssignmentData', () => {
  describe('create', () => {
    it('正常なパラメータで作成データを生成できる', () => {
      // Arrange
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      // Act
      const createData = CreateAssignmentData.create(
        title,
        genre,
        description
      );
      
      // Assert
      expect(createData).toBeInstanceOf(CreateAssignmentData);
    });
    
    it('空のタイトルでエラーを投げる', () => {
      // Arrange
      const title = "";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      // Act & Assert
      expect(() => {
        CreateAssignmentData.create(
          title,
          genre,
          description
        );
      }).toThrow("バリデーションエラー");
    });
    
    it('空のジャンルでエラーを投げる', () => {
      // Arrange
      const title = "テスト課題";
      const genre = "";
      const description = "これはテスト用の課題です";
      
      // Act & Assert
      expect(() => {
        CreateAssignmentData.create(
          title,
          genre,
          description
        );
      }).toThrow("バリデーションエラー");
    });
    
    it('空の説明でエラーを投げる', () => {
      // Arrange
      const title = "テスト課題";
      const genre = "テスト";
      const description = "";
      
      // Act & Assert
      expect(() => {
        CreateAssignmentData.create(
          title,
          genre,
          description
        );
      }).toThrow("バリデーションエラー");
    });
  });
  
  describe('toAssignment', () => {
    it('作成データから課題エンティティに変換できる', () => {
      // Arrange
      const title = "テスト課題";
      const genre = "テスト";
      const description = "これはテスト用の課題です";
      
      const createData = CreateAssignmentData.create(
        title,
        genre,
        description
      );
      
      // Act
      const assignment = createData.toAssignment();
      
      // Assert
      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.toJSON()).toEqual({
        id: expect.any(String), // IDは自動生成されるため、任意の文字列であることを確認
        title,
        genre,
        description
      });
    });
  });
});
