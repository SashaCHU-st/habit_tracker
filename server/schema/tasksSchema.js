import {z} from "zod"

export const TaskSchema = z.object({
    user_id:z.string(),
    task:z.string(),
    task_start:z.coerce.date(),
    task_end:z.coerce.date(),
})

export const DeleteSchema = z.object({
    task_id:z.number(),
    task:z.string()
})
export const MarkDaySchema = z.object({
    task_id:z.number(),
    date:z.coerce.date(),
    status1:z.string(),
})

export const MyTasksSchema = z.object({
    user_id:z.string(),
})
export const MyTaskSchema = z.object({
    task_id:z.number(),
})