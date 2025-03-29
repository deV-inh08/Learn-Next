import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'

const privatePath = ['/me']
const authPath = ['/login', '/register']

export function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const sessionToken = request.cookies.get('sessionToken')?.value
    if (privatePath.some((path) => pathName.startsWith(path)) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (authPath.some((path) => pathName.startsWith(path)) && sessionToken) {
        return NextResponse.redirect(new URL('/me', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/register', '/me']
}