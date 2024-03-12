import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 게시글 등록 API

// 게시글 전체 조회 API

// 게시글 상세 조회 API

// 게시글 수정 API
router.put('/posts/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { title, content, startDate, endDate, multiVote, updatedAt, userId } = req.body;
        if (!postId || !title || !content) return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });

        const post = await prisma.posts.findFirst({ where: { id: +postId } });
        if (!post) return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });

        const user = await prisma.users.findFirst({ where: { id: +userId } });

        const updatedPost = await prisma.posts.update({
            date: {
                nickname: user.nickname,
                title: title,
                content: content,
                startDate: startDate,
                endDate: endDate,
                multiVote: multiVote,
                updatedAt: updatedAt,
            },
            where: { id: +postId },
        });

        return res.status(200).json({ data: updatedPost, message: '게시글을 수정하였습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 삭제 API
router.delete('/posts/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });

        const post = await prisma.posts.findFirst({ where: { id: +postId } });
        if (!post) return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });

        await prisma.posts.delete({ where: { id: +postId } });

        return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default router;
