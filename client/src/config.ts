import z from 'zod'

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string()
})

const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
})


if (!configProject.success) {
    console.log(configProject.error.issues)
    throw new Error('Các giá trị khai báo trong .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig