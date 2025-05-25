/**
 * 課題エンティティ
 */
export class Assignment {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly genre: string,
    private readonly description: string,  
  ) {}

  static create(
    id: string,
    title: string,
    genre: string,
    description: string,
  ): Assignment {
    return new Assignment(id, title, genre, description);
  }
  
  // エンティティの等価性はIDで判断
  equals(other: Assignment): boolean {
    if (this.id === undefined || other.id === undefined) return false;
    return this.id === other.id;
  }
}

/**
 * 課題作成用のデータ型
 */
export class CreateAssignmentData {
  constructor(
    public readonly title: string,
    public readonly genre: string,
    public readonly description: string,
  ) {}

  static create(
    title: string,
    genre: string,
    description: string,
  ): CreateAssignmentData {
    return new CreateAssignmentData(title, genre, description);
  }

  toAssignment(id: string): Assignment {
    return new Assignment(
      id,
      this.title,
      this.genre,
      this.description,
    );
  }
}
