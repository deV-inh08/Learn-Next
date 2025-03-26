'use client'
import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
    sessionToken: string
    setSessionToken: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextType>({
    sessionToken: '',
    setSessionToken: () => ''
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be within an AppProvider')
    }
    return context
}

export const AppProvider = ({ children, initilaSessionToken = '' }: { children: React.ReactNode; initilaSessionToken?: string }) => {
    const [sessionToken, setSessionToken] = useState(initilaSessionToken)
    return (
        <AppContext value={{ sessionToken, setSessionToken }}>{children}</AppContext>
    )
}
