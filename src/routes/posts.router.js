import express from "express";
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 게시글 등록 API

// 게시글 전체 조회 API

// 게시글 상세 조회 API
router.get('/posts/:postId', async(req, res, next) =>{

        const{postId} =req.params;

        const post = await  prisma.posts.findFirst({
            where: { id: parseInt(postId) },
            select: {
                id: true,
                title: true,
                content: true,
                startDate: true,
                endDate: true,
                multiVote: true,
                user: {
                    select: {
                        userName: true,
                        nickname: true
                    }
                }
            }
        });
        return res.status(200).json({post})});
// 게시글 수정 API

// 게시글 삭제 API

export default router;
