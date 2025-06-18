type YearMonth = {
  year: number;
  month: number;
};

export class UserSuspension {
  readonly #id: string;
  readonly #userId: string;
  readonly #from: YearMonth;
  readonly #until: YearMonth;

  private constructor(props: {
    id: string;
    userId: string;
    from: YearMonth;
    until: YearMonth;
  }) {
    this.#id = props.id;
    this.#userId = props.userId;
    this.#from = props.from;
    this.#until = props.until;
  }

  static create(props: {
    userId: string;
    from: YearMonth;
    until: YearMonth;
    id?: string;
  }): UserSuspension {
    const fromDate = new Date(props.from.year, props.from.month - 1, 1);
    if (fromDate <= new Date()) {
      throw new Error("Suspension start date must be in the future.");
    }

    const untilDate = new Date(props.until.year, props.until.month - 1, 1);
    if (untilDate <= fromDate) {
      throw new Error("Suspension end date must be after the start date.");
    }

    const threeMonthsLater = new Date(fromDate);
    threeMonthsLater.setMonth(fromDate.getMonth() + 3);
    if (untilDate > threeMonthsLater) {
      throw new Error("Suspension period cannot exceed 3 months.");
    }

    const id = props.id ?? crypto.randomUUID();

    return new UserSuspension({
      id: id,
      userId: props.userId,
      from: props.from,
      until: props.until,
    });
  }

  get id(): string {
    return this.#id;
  }
  get userId(): string {
    return this.#userId;
  }
  get from(): YearMonth {
    return this.#from;
  }
  get until(): YearMonth {
    return this.#until;
  }
}
