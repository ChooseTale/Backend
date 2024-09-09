import { Inject, Injectable } from '@nestjs/common';
import { GetIntroDataComponentInterface } from '../components/port/get-intro-data.component.interface';
import { GetIntroScreenResDto } from '../../applications/dto/get-intro-screnn.dto';

@Injectable()
export class GetIntroScreenUsecase {
  constructor(
    @Inject('GetIntroDataComponent')
    private readonly getIntroDataComponent: GetIntroDataComponentInterface,
  ) {}

  async execute(gameId: number, userId: number): Promise<GetIntroScreenResDto> {
    console.log(
      await this.getIntroDataComponent.getIntroEntity(gameId, userId),
    );
    return '' as any;
  }
}
