interface IRepository<T = unknown> {
  find(id: unknown): Promise<T>;
  findAll(): Promise<T[]>;
  findByUserId(payload: unknown): Promise<T>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(id: unknown): void;
}

export { type IRepository };
