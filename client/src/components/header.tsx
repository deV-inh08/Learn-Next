import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

export const Header = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href='/login'>Đăng nhập</Link>
                </li>
                <li>
                    <Link href='/register'>Đăng kí</Link>
                </li>
            </ul>
            <ModeToggle />
        </div>
    )
}
