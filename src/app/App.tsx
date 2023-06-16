import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./components/store/store";
import Category from "./components/UI/Category";
import FavoritesPage from "./components/UI/FavoritesPage";
import Homepage from "./components/UI/Homepage";
import { Article } from "./components/utils/types";

import "./App.scss";

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [remainingArticles, setRemainingArticles] = useState<Article[]>([]);
  const [favoritesSearchQuery, setFavoritesSearchQuery] = useState("");

  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        document.title = "Vrati se:)";
      } else if (document.visibilityState === "visible") {
        document.title = "MyNews";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7hEQKkyr9wQu1oS7rhrDLPG7psTxzfGQ`;

    axios
      .get(url)
      .then((response) => {
        let articles = response.data.response.docs
          .filter((doc: any) => doc.section_name) // Remove articles without a category
          .map((doc: any) => ({
            title: doc.headline.main,
            category: doc.section_name.toLowerCase(),
            publishedAt: new Date(doc.pub_date),
            img: `https://static01.nyt.com/${doc.multimedia[0]?.url || null}`,
          }));

        // Sorting articles in descending order (most recent first)
        articles = articles.sort(
          (a: Article, b: Article) =>
            b.publishedAt.getTime() - a.publishedAt.getTime()
        );

        setArticles(articles);
        const initialDisplayedArticles = articles.slice(0, 10);
        setDisplayedArticles(initialDisplayedArticles);
        setRemainingArticles(articles.slice(10));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFavorites = favorites.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query !== "") {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedArticles(filtered);
      setRemainingArticles([]);
    } else {
      const initialDisplayedArticles = articles.slice(0, 10);
      setDisplayedArticles(initialDisplayedArticles);
      setRemainingArticles(articles.slice(10));
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      if (remainingArticles.length > 0) {
        setDisplayedArticles((prevDisplayedArticles) => {
          const moreArticles = remainingArticles.slice(0, 10);
          return [...prevDisplayedArticles, ...moreArticles];
        });
        setRemainingArticles((prevRemainingArticles) =>
          prevRemainingArticles.slice(10)
        );
      }
    }
  };

  const handleScrollRef = useRef(handleScroll); // Create a ref to the handleScroll function

  useEffect(() => {
    window.addEventListener("scroll", handleScrollRef.current); // Use the ref to attach the event listener
    return () => {
      window.removeEventListener("scroll", handleScrollRef.current); // Use the ref to remove the event listener
    };
  }, []);

  // Group articles by category
  const articlesByCategory = articles.reduce<{ [key: string]: Article[] }>(
    (acc, article) => {
      (acc[article.category] = acc[article.category] || []).push(article);
      return acc;
    },
    {}
  );
  const handleFilterFavorites = (query: string) => {
    setFavoritesSearchQuery(query);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage
            displayedArticles={displayedArticles}
            handleSearch={handleSearch}
            articles={filteredArticles}
          />
        }
      />

      <Route
        path="/favorites"
        element={
          <FavoritesPage
            favorites={filteredFavorites}
            handleSearch={handleSearch}
            displayedArticles={filteredFavorites}
          />
        }
      />

      <Route
        path="/:category"
        element={
          <Category
            articlesByCategory={articlesByCategory}
            handleSearch={handleSearch}
            displayedArticles={displayedArticles}
          />
        }
      />
    </Routes>
  );
};

export default App;
