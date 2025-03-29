import http from "@/lib/http"
import { AccountResType } from "@/schemaValidations/account.schema"

const accountApiReq = {
    me(sessionToken: string) {
        return http.get<AccountResType>('account/me', {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        })
    },
}

export default accountApiReq