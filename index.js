const express = require("express");
const categories = require("./categories");
const newsData = require("./news_data");
const subCategories = require("./subCategories");
newsData;
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(newsData);
});

app.get("/categories", (req, res) => {
  res.send(categories);
});
app.get("/sub-categories", (req, res) => {
  res.send(subCategories);
});

app.get("/sliderInfo", (req, res) => {
  const SliderNews = (category) => {
    const news_by_category = newsData.find(
      (obj) => obj.category_id === category
    );
    return news_by_category;
  };
  const topNews = [
    SliderNews("Sports"),
    SliderNews("India"),
    SliderNews("International"),
    SliderNews("Tamilnadu"),
    SliderNews("Cinema"),
    SliderNews("Economy"),
  ];
  res.send(topNews);
});

app.get("/home", (req, res) => {
  const getTopNews = (category) => {
    const news_by_category = newsData.filter(
      (obj) => obj.category_id === category
    );
    const topNews_by_category = news_by_category.slice(0, 5);
    return topNews_by_category;
  };

  const topNews = [
    {
      category_name: "Sports",
      sports: getTopNews("Sports"),
    },
    { category_name: "India", 
    india: getTopNews("India") },
    {
      category_name: "International",
      international: getTopNews("International"),
    },
    {
      category_name: "Tamilnadu",
      tamilnadu: getTopNews("Tamilnadu"),
    },
    {
      category_name: "Cinema",
      cinema: getTopNews("Cinema"),
    },
    {
      category_name: "Economy",
      economy: getTopNews("Economy"),
    },
  ];

  res.send(topNews);
});

//Getting news by category
app.get("/:category", (req, res) => {
  const news_by_category = newsData.filter(
    (obj) => obj.category_id === req.params.category
  );
  res.send(news_by_category);
});

//Getting news by sub category
app.get("/:category/:subCategory", (req, res) => {
  const news_by_category = newsData.filter(
    (obj) => obj.category_id === req.params.category
  );
  const news_by_subcategory = news_by_category.filter((obj) => {
    const a = obj.subcategory_id;
    const required = req.params.subCategory;
    const matched = a.find((cate) => cate === required);
    if (matched) {
      return obj;
    }
  });
  res.send(news_by_subcategory);
});

//Getting news by sub category
app.get("/tags/subcategory/:tag", (req, res) => {
  const news_by_subcategory = newsData.filter((obj) => {
    const subCategory = obj.subcategory_id;
    const required = req.params.tag;
    const matched = subCategory.find((cate) => cate === required);
    if (matched) {
      return obj;
    }
  });
  res.send(news_by_subcategory);
});
const port = process.env.PORT || 5000;

app.listen(port);
