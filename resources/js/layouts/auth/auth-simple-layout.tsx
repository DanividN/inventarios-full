// import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import imgBackgroundLogin from '../../../../public/backgroundsImg/fondo_login.png';
import logoGobti from '../../../../public/iconos/inventarios_gobti.svg'

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10" style={{ backgroundImage: `url(${imgBackgroundLogin})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8 bg-white/80 p-8 rounded-lg shadow-lg backdrop-blur-md dark:bg-gray-800/80">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            {/* <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md"> */}
                                {/* <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" /> */}
                                <img src={logoGobti} alt="" className="w-60"/>
                            {/* </div> */}
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
