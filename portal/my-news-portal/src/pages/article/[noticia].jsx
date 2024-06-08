import { useRouter } from 'next/router';

export default function Article({ articles }) {
    const router = useRouter();
    const { noticia } = router.query;

    return (
        <div>
        </div>
    );
}