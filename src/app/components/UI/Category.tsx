import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../utils/types";
import LatestNews from "../UI/LatestNews";
import ArticlesList from "./ArticlesList";
import "./Global.scss";
import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import SidebarMenu from "./Sidebar";
import Navigation from "./Navigation";

interface CategoryProps {
  articlesByCategory: { [key: string]: Article[] };
  handleSearch: (query: string) => void;
  displayedArticles: Article[];
}

const Category: React.FC<CategoryProps> = ({
  articlesByCategory,
  handleSearch,
  displayedArticles,
}) => {
  const { category } = useParams<{ category?: string }>();
  const normalizedCategory = category ? category.toLowerCase() : null;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  const isMobileView = useMediaQuery("(max-width: 1000px)");

  if (!normalizedCategory) {
    return <p>No category selected.</p>;
  }

  const articles = articlesByCategory[normalizedCategory] || [];

  const articlesDiv1 = articles.slice(0, 2);
  const articlesDiv2 = articles.slice(2, 4);
  const latestNews = displayedArticles;
  const remainingArticles = articles.slice(4);

  return (
    <div className="container-news">
      <Navigation handleSearch={handleSearch} />

      <Box sx={{ my: 5, display: "flex" }}>
        <SidebarMenu />

        <div className="parent">
          {articles.length === 0 ? (
            <>
              <h5>No articles found for category {normalizedCategory}</h5>
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
                <Tab label="Featured" className="font" />
                <Tab label="Latest"  className="font"/>
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

export default Category;
