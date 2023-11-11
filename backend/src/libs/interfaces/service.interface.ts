interface IService<T = unknown> {
  find(payload: unknown): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(payload: unknown): Promise<void>;
}

export { type IService };
