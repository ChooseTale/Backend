import { Genres } from '@prisma/client';

export type ListSort = `LATEST` | `POPULAR`;

export type ListGenre = Genres | 'ALL';
