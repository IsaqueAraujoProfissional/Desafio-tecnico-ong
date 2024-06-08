import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '@/components/Card';

export default function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
            const data = await res.json();
            setArticles(data.articles);
        };
        fetchArticles();
    }, []);

    return (
        <div>
            <h1>Latest News</h1>
            <div className={styles.articles}>
                {articles.map((article, index) => (
                    <Card key={index} article={article} index={index}></Card>
                ))}
            </div>
        </div>
    );
}
