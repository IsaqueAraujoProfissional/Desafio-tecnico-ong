import styles from '../styles/Card.module.css';
import Link from 'next/link';

export default function Card(props) {
    let article = props.article
    let index = props.index
    return (
        <Link legacyBehavior href={`/article/${index}`}>
            <a className={styles.card}>
                <h2>{article.title}</h2>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                {article.description && <p>{article.description}</p>}
                {article.author && <p>By: {article.author}</p>}
                {article.publishedAt && <p>{new Date(article.publishedAt).toLocaleDateString()}</p>}
            </a>
        </Link>

    )
}