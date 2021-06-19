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
      news: getTopNews("Sports"),
    },
    { category_name: "India", news: getTopNews("India") },
    {
      category_name: "International",
      news: getTopNews("International"),
    },
    {
      category_name: "Tamilnadu",
      news: getTopNews("Tamilnadu"),
    },
    {
      category_name: "Cinema",
      news: getTopNews("Cinema"),
    },
    {
      category_name: "Economy",
      news: getTopNews("Economy"),
    },
  ];
  res.send(topNews);
});

//Getting news by category
app.get("category/:category", (req, res) => {
  const news_by_category = newsData.filter(
    (obj) => obj.category_id === req.params.category
  );
  res.send(news_by_category);
});

//Getting news by category for pagination
app.get("category/:category/:numb", (req, res) => {
  const news_by_category = newsData.filter(
    (obj) => obj.category_id === req.params.category
  );
  const number = req.params.numb;
  if (number == 1) {
    const news_for_show = news_by_category.slice(0, 2);
    res.send(news_for_show);
  } else {
    const slice_first = 2 * (number - 1);
    const slice_second = slice_first + 2;
    const news_for_show = news_by_category.slice(slice_first, slice_second);
    res.send(news_for_show);
  }
});

//Getting news by sub category
app.get("/:category/sub/:subCategory", (req, res) => {
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

//++++++++++++++++++++++++FOR ENGLISH VERSION+++++++++++++++++++++++//

app.get("/en", (req, res) => {
  res.send(newsData);
});

app.get("/en/categories", (req, res) => {
  res.send(categories);
});
app.get("/en/sub-categories", (req, res) => {
  res.send(subCategories);
});

app.get("/en/sliderInfo", (req, res) => {
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

app.get("/en/home", (req, res) => {
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
      news: getTopNews("Sports"),
    },
    { category_name: "India", news: getTopNews("India") },
    {
      category_name: "International",
      news: getTopNews("International"),
    },
    {
      category_name: "Tamilnadu",
      news: getTopNews("Tamilnadu"),
    },
    {
      category_name: "Cinema",
      news: getTopNews("Cinema"),
    },
    {
      category_name: "Economy",
      news: getTopNews("Economy"),
    },
  ];
  res.send(topNews);
});

//Getting news by category
app.get("/en/category/:category", (req, res) => {
  const news_by_category = newsData.filter(
    (obj) => obj.category_id === req.params.category
  );
  res.send(news_by_category);
});

//Getting news by category for pagination
app.get("/en/category/:category/:numb", (req, res) => {
  const news_by_category = newsData.filter(
    (obj) => obj.category_id === req.params.category
  );
  const number = req.params.numb;
  if (number == 1) {
    const news_for_show = news_by_category.slice(0, 2);
    res.send(news_for_show);
  } else {
    const slice_first = 2 * (number - 1);
    const slice_second = slice_first + 2;
    const news_for_show = news_by_category.slice(slice_first, slice_second);
    res.send(news_for_show);
  }
});

//Getting news by sub category
app.get("/en/category/:category/sub/:subCategory", (req, res) => {
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
app.get("/en/tags/subcategory/:tag", (req, res) => {
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
