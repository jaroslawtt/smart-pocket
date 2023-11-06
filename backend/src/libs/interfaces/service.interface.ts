interface IService<T = unknown> {
  find(payload: string): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(id: string, payload: unknown): Promise<T>;
  delete(payload: string): Promise<void>;
}

export { type IService };
