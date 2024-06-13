import { PrismaService } from "@@prisma/prisma.service";
import { AppController } from "./app.controller";

describe('AppController', () => {
    let appController: AppController;
    let prismaService: PrismaService

    prismaService = {
        $queryRaw: jest.fn(),
    } as any as PrismaService;

    beforeEach(() => {
        appController = new AppController(prismaService);
    });

    describe('ping', () => {
        it('should return "pong"', async () => {
            const result =  appController.ping();
            expect(result).toEqual({key : 'pong'});
        });
    });
})