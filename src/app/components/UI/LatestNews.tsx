import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import { Article } from "../utils/types";
import "./LatestNews.scss";
import { ReactComponent as LatestNewsIcon } from "../UI/assets/images/latest-news-icon.svg";
interface LatestNewsProps {
  allArticles: Article[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ allArticles }) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    const startIndex = displayedArticles.length % allArticles.length;
    const endIndex = startIndex + 10;
    const moreArticles = allArticles.slice(startIndex, endIndex);
    setDisplayedArticles([...displayedArticles, ...moreArticles]);
  };

  const formatTime = (publishedAt: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return publishedAt.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="latest-news-container-parent">
      <div className="latest-news-container">
        <div className="latest-news-flex">
          <LatestNewsIcon />
          <h1 className="naslov-latest-news">Latest News</h1>
        </div>

        <InfiniteScroll
          dataLength={displayedArticles.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <ul className="latest-news-list">
            {displayedArticles.map((article: Article, index: number) => (
              <li key={index} >
                <p className="latest-news-time-paragraph">
                  {formatTime(new Date(article.publishedAt))}
                </p>
                <h3 className="latest-news-time-title">{article.title}</h3>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default LatestNews;
