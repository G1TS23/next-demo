import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/prisma/coins', '/logout']
const publicRoutes = ['/login', '/demos', '/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Get session from the cookie
    const cookie = (await cookies()).get('session')?.value
    const session = cookie;

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // 5. Redirect to /memecoins if the user is authenticated
    if (
        isPublicRoute &&
        session &&
        !req.nextUrl.pathname.startsWith('/prisma/coins')
    ) {
        return NextResponse.redirect(new URL('/prisma/coins', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}