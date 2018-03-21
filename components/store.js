import {store as createStore} from 'react-easy-state';

const topArticlesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const generateItemUrl = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

// basic data structures
export const store = createStore({
  articles: [],
  loadingArticles: false,
  currentArticle: false,
  comments: [],
  loadingComments: false,
});

// methods
export const getArticles = async () => {
  store.loadingArticles = true;
  const articleIds = await fetch(topArticlesUrl).then(r => r.json());
  store.articles = await Promise.all(
    articleIds
      .slice(0, 10)
      .map(id => generateItemUrl(id))
      .map(url => fetch(url).then(r => r.json()))
  );
  store.loadingArticles = false;
};

export const setCurrentArticle = async article => {
  store.loadingComments = true;
  store.currentArticle = article;
  store.currentArticle.comments = await Promise.all(
    store.currentArticle.kids.map(id => generateItemUrl(id)).map(url => fetch(url).then(r => r.json()))
  );
  store.loadingComments = false;
};
