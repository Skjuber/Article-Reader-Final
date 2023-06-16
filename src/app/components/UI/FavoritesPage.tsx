import React, { useState, useEffect } from "react";
import { Article } from "../utils/types";
import LatestNews from "../UI/LatestNews";
import ArticlesList from "./ArticlesList";
import "./Global.scss";
import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import SidebarMenu from "./Sidebar";
import Navigation from "./Navigation";

interface FavoritesPageProps {
  favorites: Article[];
  handleSearch: (query: string) => void;
  displayedArticles: Article[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  displayedArticles,
  handleSearch,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState<Article[]>([]);

  useEffect(() => {
    const filtered = favorites.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  }, [favorites, searchTerm]);

  const articlesDiv1 = filteredFavorites.slice(0, 2);
  const articlesDiv2 = filteredFavorites.slice(2, 4);
  const latestNews = displayedArticles;
  const remainingArticles = filteredFavorites.slice(4);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  const isMobileView = useMediaQuery("(max-width: 1000px)");

  return (
    <div className="container-news">
      <Navigation handleSearch={handleSearch} />

      <Box sx={{ my: 5, display: "flex" }}>
        <SidebarMenu />

        <div className="parent">
          {favorites.length === 0 ? (
            <>
              <h5>Your favorites list is empty</h5>
              <div className="div3">
                <LatestNews allArticles={latestNews} />
              </div>
            </>
          ) : isMobileView ? (
            <div className="tabs-container">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="News Tabs"
              >
                <Tab label="Featured" />
                <Tab label="Latest" />
              </Tabs>
              {activeTab === 0 && (
                <div>
                  <div className="div1">
                    <ArticlesList articles={articlesDiv1} />
                  </div>
                  <div className="div2">
                    <ArticlesList articles={articlesDiv2} />
                  </div>
                  <div className="div4">
                    <ArticlesList articles={remainingArticles} />
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="div3">
                  <LatestNews allArticles={latestNews} />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="div1">
                <ArticlesList articles={articlesDiv1} />
              </div>
              <div className="div2">
                <ArticlesList articles={articlesDiv2} />
              </div>
              <div className="div3">
                <LatestNews allArticles={latestNews} />
              </div>
              <div className="div4">
                <ArticlesList articles={remainingArticles} />
              </div>
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

export default FavoritesPage;
