// src/controllers/search.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { SearchInput } from '@geoapp/types';

export async function search(req: Request, res: Response) {
  const { q } = req.query as unknown as SearchInput;

  const [trips, users] = await Promise.all([
    prisma.trip.findMany({
      where: {
        title: { contains: q, mode: 'insensitive' },
      },
      take: 10,
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
        _count: { select: { posts: true } },
      },
    }),
    prisma.user.findMany({
      where: {
        username: { contains: q, mode: 'insensitive' },
      },
      take: 10,
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        bio: true,
      },
    }),
  ]);
  
  res.status(200).json({success: true, data: { trips, users }});
}