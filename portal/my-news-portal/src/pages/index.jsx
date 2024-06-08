import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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
        </div>
    );
}
