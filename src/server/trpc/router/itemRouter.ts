import { router, publicProcedure } from "../trpc"
import { z } from "zod"
// implement a router that gets all items



export const itemRouter = router({
    addItem: publicProcedure
        .input(z.object({
            desc: z.string(),
            project: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const { desc, project } = input
            const item = await ctx.prisma.items.create({
                data: {
                    desc: desc,
                    project: project,
                }
            })
            return item
        }),
    getAllInProject: publicProcedure
        .input(z.object({
            project: z.string(),
        }))
        .query(async ({ input, ctx }) => {
            const { project } = input
            const items = await ctx.prisma.items.findMany({
                where: {
                    project: project
                }
            })
            return items
        }),
    getAll: publicProcedure
        .input(z.object({
            project: z.string(),
        }))
        .query(async ({ ctx }) => {
            const items = await ctx.prisma.items.findMany()
            return items
        }),
    checkItem: publicProcedure
        .input(z.object({
            id: z.string(),
            checked: z.boolean(),
        }))
        .mutation(async ({ input, ctx }) => {
            const { id, checked } = input
            const item = await ctx.prisma.items.update({
                where: {
                    id: id
                },
                data: {
                    checked: checked
                }
            })
            return item
        }),
})
