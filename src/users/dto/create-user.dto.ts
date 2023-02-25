export class CreateUserDto {
  email: string;
  password: string;
  refreshToken?: string;
  activatedLink: string
}
