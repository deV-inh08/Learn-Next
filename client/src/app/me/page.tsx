import accountApiReq from '@/apiRequest/account'
import { Profile } from '@/app/me/profile'
import { cookies } from 'next/headers'

const MeProfile = async () => {
    const cookie = await cookies()
    // path api have see sessionToken, otherwise don't see, set Path=/ in Headers
    const sessionToken = cookie.get('sessionToken')?.value
    const result = await accountApiReq.me(sessionToken as string)
    return (
        <div>
            <h1>Profile</h1>
            <p>{result.payload.data.name}</p>
            <Profile />
        </div>
    )
}


export default MeProfile