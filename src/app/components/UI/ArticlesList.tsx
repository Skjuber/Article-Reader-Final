import React from "react";
import { Article } from "../utils/types";
import ArticleActions from "../store/reducers/ArticleActions";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./Articles.scss";

interface ArticlesListProps {
  articles: Article[];
}
const defaultImage =
  "https://cdn.shopify.com/s/files/1/1094/4892/products/zidne-slike-moderne_9aaacbd7-4af6-44b8-975c-20c75c3d2a88_1500x900.jpg?v=1623408204";
const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  return (
    <div className="articles-list">
      {articles.map((article: Article, index: number) => (
        <div className="article-item" key={index}>
          <Card
            sx={{
              borderRadius: "10px",
              marginBottom: "20px",
              width: "100%",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              height="211"
              image={article.img || defaultImage}
              alt="Article Image"
            />
            <CardContent
              sx={{
                padding: "15px",
                backgroundColor: "white",
                minHeight: "75px",
              }}
            >
              <Typography className="kategorije-article"
                variant="body2"
                color="text.secondary"
                sx={{
                  color: "#1E71BB",
                  fontSize: "10px",
                  lineHeight: 3,
                  textTransform: "uppercase",
                }}
              >
                {article.category}
              </Typography>
              <Typography className="article-naslov"
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"16px"}
              >
                {article.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"16px"}
              >
                {article.author}
              </Typography>
              <ArticleActions article={article} />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
