import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Article.module.css';

export default function Article({ article }) {
    const router = useRouter();

    const { country, id } = router.query;
    console.log(country, id)

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.content}>{article.content}</p>
            <div className={styles.meta}>
                {article.author && <p>By: {article.author}</p>}
                {article.publishedAt && <p>Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>}
            </div>
            <Link legacyBehavior href={{ pathname: '/', query: { local: country } }}>
                <a className={styles.backButton}>Back to Home</a>
            </Link>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [], // Vamos usar fallback para carregar dinamicamente as páginas
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const { country, id } = params;
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    //const data = await res.json();
    const data = {
        "status": "ok",
        "totalResults": 45,
        "articles": [
            {
                "source": {
                    "id": "bloomberg",
                    "name": "Bloomberg"
                },
                "author": "Matthew Martin, Julia Fioretti",
                "title": "Saudis Said to Hand About 60% of Aramco Offer to Foreign Funds - Bloomberg",
                "description": "Foreign investors are set to be allocated about 60% of the shares on offer in Saudi Aramco’s $11.2 billion stock sale, people familiar with the matter said, marking a turnaround from the oil giant’s 2019 listing that ended up as a largely local affair.",
                "url": "https://www.bloomberg.com/news/articles/2024-06-08/saudis-said-to-hand-about-60-of-aramco-offer-to-foreign-funds",
                "urlToImage": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iJtGT7mWJI_Q/v0/1200x800.jpg",
                "publishedAt": "2024-06-08T13:04:37Z",
                "content": "Foreign investors are set to be allocated about 60% of the shares on offer in Saudi Aramcos $11.2 billion stock sale, people familiar with the matter said, marking a turnaround from the oil giants 20… [+332 chars]"
            }
        ]
    }
    const article = data.articles[id];

    if (!article) {
        return {
            notFound: true,
        };
    }

    return { props: { article } };
}