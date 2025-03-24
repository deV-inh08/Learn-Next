Routing trong Next.js

Next.js cung cấp hai hệ thống định tuyến:

Pages Router (pages/): Sử dụng trong Next.js 12 hoặc chế độ cũ của Next.js 13+.

App Router (app/): Được giới thiệu từ Next.js 13 và sử dụng React Server Components.

1️⃣ Pages Router (pages/)

🔹 Mỗi file .tsx trong pages/ là một route.
🔹 Hỗ trợ Routing động với [param].tsx.
🔹 Cung cấp API Routes trong pages/api/.

📌 Ví dụ cấu trúc Pages Router:

pages/
│── index.tsx → /
│── about.tsx → /about
│── contact.tsx → /contact
│── auth/
│ ├── login.tsx → /auth/login
│ ├── register.tsx → /auth/register
│── products/
│ ├── [id].tsx → /products/:id

📌 Điều hướng bằng next/link:

import Link from 'next/link';
export default function Home() {
return <Link href="/about">About</Link>;
}

📌 Nhận id từ URL trong trang động:

import { useRouter } from 'next/router';
export default function ProductPage() {
const router = useRouter();
return <h1>Product ID: {router.query.id}</h1>;
}

2️⃣ App Router (app/)

🔹 Dựa trên thư mục, mỗi thư mục chứa page.tsx là một route.
🔹 Hỗ trợ Layout, Server Components, và Loading UI.
🔹 Không cần getServerSideProps, getStaticProps, mà sử dụng fetch() trong server components.

📌 Ví dụ cấu trúc App Router:

app/
│── layout.tsx → Dùng làm layout chung
│── page.tsx → /
│── about/
│ ├── page.tsx → /about
│── auth/
│ ├── login/
│ │ ├── page.tsx → /auth/login
│ ├── register/
│ │ ├── page.tsx → /auth/register
│── products/
│ ├── [id]/
│ │ ├── page.tsx → /products/:id

📌 Trang đơn giản với App Router:

export default function AboutPage() {
return <h1>About Page</h1>;
}

📌 Sử dụng useRouter trong App Router (Client Component):

'use client';
import { useRouter } from 'next/navigation';
export default function Page() {
const router = useRouter();
return <button onClick={() => router.push('/about')}>Go to About</button>;
}

📌 Server Component trong App Router:

export default async function ProductPage({ params }: { params: { id: string } }) {
const res = await fetch(`https://api.example.com/products/${params.id}`);
const product = await res.json();
return <h1>{product.name}</h1>;
}

3️⃣ Dynamic Routing

📌 Pages Router:

Sử dụng [id].tsx để tạo trang động.

Truy xuất giá trị id bằng useRouter().query.id.

📌 App Router:

Dùng [id]/page.tsx.

Truy xuất id từ params trong Server Component.

📌 Ví dụ route động trong App Router:

export default function Page({ params }: { params: { id: string } }) {
return <h1>Product ID: {params.id}</h1>;
}

4️⃣ Nested Routing & Layouts (App Router)

📌 Cấu trúc Nested Layout:

app/
│── layout.tsx → Layout chính
│── dashboard/
│ ├── layout.tsx → Layout riêng của dashboard
│ ├── page.tsx → /dashboard
│ ├── settings/
│ │ ├── page.tsx → /dashboard/settings

📌 Ví dụ layout.tsx cho Nested Routing:

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
return (
<div>
<nav>Dashboard Navigation</nav>
<main>{children}</main>
</div>
);
}

5️⃣ API Routes (pages/api/)

🔹 Chỉ có trong Pages Router.
🔹 Dùng để tạo API serverless.

📌 Ví dụ API Route /api/hello.ts:

export default function handler(req, res) {
res.status(200).json({ message: 'Hello World' });
}

6️⃣ Middleware (Chặn truy cập, Redirect)

📌 Ví dụ chặn truy cập trang /dashboard nếu chưa đăng nhập:

import { NextResponse } from 'next/server';
export function middleware(req) {
const loggedIn = req.cookies.get('auth-token');
if (!loggedIn) return NextResponse.redirect(new URL('/login', req.url));
return NextResponse.next();
}
export const config = { matcher: '/dashboard/:path\*' };
