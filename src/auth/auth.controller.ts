import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { RefreshTokenGuard } from "src/common/guards/refreshToken.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signUp(createUserDto);
    await this.saveRefreshToken(res, tokens);
    console.log(tokens, "signup");
    return res.json(tokens);
  }

  @Post("signin")
  async signin(@Body() data: AuthDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(data);
    await this.saveRefreshToken(res, tokens);
    console.log(tokens, "signin");
    return res.json(tokens);
  }

  @Get("activated/:link")
  async activated(@Param("link") link: string) {
    await this.authService.activated(link)
    return 'Email completed true'
  }

  @UseGuards(AccessTokenGuard)
  @Post("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req.user["sub"]);
    await this.clearRefreshToken(res);
    return res.json("Clear Tokens");
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const userId = req.user["sub"];
    const refreshToken = req.user["refreshToken"];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    await this.saveRefreshToken(res, tokens);
    return res.json(tokens);
  }

  private async saveRefreshToken(res, tokens) {
    return res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
  }

  private async clearRefreshToken(res) {
    return res.clearCookie("refreshToken");
  }
}
