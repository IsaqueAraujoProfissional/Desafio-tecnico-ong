import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Article.module.css';

export default function Article({ articles }) {
    const router = useRouter();
    const { id } = router.query;
    const article = articles[id];

    if (!article) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.content}>{article.content}</p>
            <div className={styles.meta}>
                {article.author && <p>By: {article.author}</p>}
                {article.publishedAt && <p>Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>}
            </div>
            <Link legacyBehavior href="/">
                <a className={styles.backButton}>Back to Home</a>
            </Link>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    const data = await res.json();
    const paths = data.articles.map((_, index) => ({
        params: { id: index.toString() },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    const data = await res.json();
    return { props: { articles: data.articles } };
}