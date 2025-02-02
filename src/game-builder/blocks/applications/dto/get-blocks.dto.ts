export class GetBlocksReqDto {}

export class GetBlocksResDto {
  blocks: {
    id: number;
    content: string;
  }[];
}
