export class MeResDto {
  id: number;
  email: string;
  nickname: string;
  profileImage: { url: string | null };
  admin: { isMaster: boolean };
}
