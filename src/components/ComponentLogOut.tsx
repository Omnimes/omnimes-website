'use client'
import { signOut } from 'next-auth/react'

export const ComponentLogOut = () => {
    return (
        <button
            onClick={() => signOut()}
        >
            Wyloguj
        </button>        
    )
}