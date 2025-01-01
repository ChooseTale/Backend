import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetBlocksResDto } from './dto/get-blocks.dto';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';
import { UpdateBlockReqDto, UpdateBlockResDto } from './dto/update-block';

@UseGuards(AuthSerializeGuard)
@Controller('/game/:gameId/page/:pageId/blocks')
export class BlockController {
  @Get('')
  async getBlocks(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
  ): Promise<GetBlocksResDto> {
    return {
      blocks: [
        { id: 1, content: 'test' },
        { id: 2, content: 'test2' },
      ],
    };
  }

  /**
   * 콘텐츠의 블럭은 db상에서 배열이기에 생성, 수정, 삭제 모두 배열을 덮어씌움.
   *
   * @summary (250101) 블록 생성
   * @param gameId
   * @param pageId
   * @param body
   * @returns
   */
  @Post('')
  async updateBlock(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
    @Body() body: UpdateBlockReqDto,
  ): Promise<UpdateBlockResDto> {
    return {
      id: 1,
      contents: body.contents,
    };
  }
}
