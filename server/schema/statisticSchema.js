import {z} from "zod"

export const StatisticSchema = z.object({
    task_id:z.string(),
    // status1:z.string()
})