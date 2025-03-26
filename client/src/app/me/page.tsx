import envConfig from '@/config'
import { cookies } from 'next/headers'

const MeProfile = async () => {
    const cookie = await cookies()
    // path api have see sessionToken, otherwise don't see, set Path=/ in Headers
    const sessionToken = cookie.get('sessionToken')
    console.log(sessionToken?.value)
    const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,

        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken?.value}`
            }
        }).then(async (res) => {
            const payload = await res.json()
            const data = {
                status: res.status,
                payload
            }
            if (!res.ok) {
                throw data
            }
            return data
        })
    console.log(result)
    return (
        <div>
            <h1>Profile</h1>
            <p>{result.payload.data.name}</p>
        </div>
    )
}


export default MeProfile