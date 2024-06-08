import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';

export default function Home() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [country, setCountry] = useState(router.query.local === undefined ? 'us': router.query.local); // Estado para controlar o país selecionado

    useEffect(() => {
        setArticles([])
        setPage(1)
        setHasMore(true)
        fetchArticles(true);
    }, [country]);

    const fetchArticles = async (isNewCountry = false) => {
        const currentPage = isNewCountry ? 1 : page;
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&page=${currentPage}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
        const data = await res.json();
        /*const data = {
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
        }*/
        if (data.articles.length === 0) {
            console.log('ok')
            setHasMore(false);
        } else {
            setArticles(prevArticles => isNewCountry ? data.articles : [...prevArticles, ...data.articles]);
            setPage(prevPage => prevPage + 1);
        }
    };

    const changeCountry = async (selectedCountry) => {
        if (selectedCountry !== country) {
            setCountry(selectedCountry);
        }

    };

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Notícias Mais Relevantes</h1>
            <div className={styles.buttonContainer}>
                <button onClick={() => changeCountry('us')} className={country === 'us' ? styles.activeButton : ''}>US News</button>
                <button onClick={() => changeCountry('br')} className={country === 'br' ? styles.activeButton : ''}>Brazil News</button>
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchArticles}
                hasMore={hasMore}
                loader={<h4 style={{textAlign: 'center'}}>Carregando...</h4>}
                endMessage={<p style={{textAlign: 'center'}}>Não há mais nada pra carregar</p>}
            >
                <div className={styles.articles}>
                    {articles.map((article, index) => (
                        <Card key={index} article={article} index={index} country={country}></Card>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
