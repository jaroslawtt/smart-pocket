interface IRepository<T = unknown> {
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(id: string): void;
}

export { type IRepository };
