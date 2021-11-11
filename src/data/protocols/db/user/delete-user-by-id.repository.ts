export interface DeleteUserByIdRepository {
  deleteUser: (id: number) => Promise<void>;
}
