import { UserSuspension } from "./userSuspension";

export interface UserSuspensionRepository {
  save: (userSuspension: UserSuspension) => Promise<void>;
}
