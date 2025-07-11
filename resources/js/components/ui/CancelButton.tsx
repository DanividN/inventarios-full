import { Link } from "@inertiajs/react"

interface CancelButtonProps {
    link?: string;
    text?: string;
}

export default function CancelButton({link, text}: CancelButtonProps) {
    return (
        <Link href={link} className='bg-white text-gray-400 rounded-lg px-6 py-2 mr-4 border'>
            { text ? text : 'Cancelar' }
        </Link>
    )
}
