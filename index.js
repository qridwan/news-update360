const express = require("express");
const newsData = require("./news_data");
newsData;
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(newsData);
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
    // const subCategory_array = obj.subcategory_id;
    // const subCategoryNews = subCategory_array.filter(
    //   (cate) => cate === req.params.subCategory
    // );
    // console.log("🚀 ~ subCategoryNews", subCategoryNews)
    // return subCategoryNews;
  });
  res.send(news_by_subcategory);
});
const port = process.env.PORT || 5000;

app.listen(port);
