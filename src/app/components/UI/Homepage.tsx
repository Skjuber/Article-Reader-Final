import React, { useState } from "react";
import { Article } from "../utils/types";
import LatestNews from "../UI/LatestNews";
import ArticlesList from "./ArticlesList";
import "./Global.scss";
import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import SidebarMenu from "./Sidebar";
import Navigation from "./Navigation"; // Import the Navigation component here
import Track from "./track";
interface HomepageProps {
  displayedArticles: Article[];
  articles: Article[];
  handleSearch: (query: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({
  displayedArticles,
  handleSearch,
  articles,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const articlesDiv1 = articles.slice(0, 2);
  const articlesDiv2 = articles.slice(2, 4);
  const latestNews = displayedArticles;
  const remainingArticles = articles.slice(4);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  const isMobileView = useMediaQuery("(max-width: 1000px)");

  return (
    <div className="container-news">
   
      <Navigation handleSearch={handleSearch} />{" "}
      <Box sx={{ my: 5, display: "flex" }}>
        <SidebarMenu />

        <div className="parent">
          {isMobileView ? (
            <>
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
            </>
          ) : (
            <>
               <Track/>
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

export default Homepage;
