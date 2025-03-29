'use client'
import accountApiReq from '@/apiRequest/account'
import { clientSessionToken } from '@/lib/http'
import React, { useEffect } from 'react'

export const Profile = () => {
    useEffect(() => {
        const fetchRequest = async () => {
            const result = await accountApiReq.me(clientSessionToken.value)
            console.log(result)
        }
        fetchRequest()
    }, [clientSessionToken.value])
    return (
        <div>Profile</div>
    )
}
