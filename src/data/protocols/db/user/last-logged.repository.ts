export interface LastLoggedRepository {
  lastLogged: (id: number, lastLogged: Date) => Promise<void>;
}
