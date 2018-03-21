import React from 'react';
import {view} from 'react-easy-state';

import {store, getArticles, setCurrentArticle} from '../components/store';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    getArticles();
  }

  selectArticle(article, e) {
    e.preventDefault();
    setCurrentArticle(article);
  }

  render() {
    return (
      <React.Fragment>
        <style jsx>
          {`
            .article {
              margin-bottom: 5px;
            }

            .article a {
              margin-right: 5px;
            }

            .wrapper {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-gap: 10px;
              grid-auto-rows: minmax(100px, auto);
            }

            .left-col {
              grid-column: 1 / 2;
              grid-row: 1;
            }
            .right-col {
              grid-column: 2 / 4;
              grid-row: 1;
            }
          `}
        </style>

        <div className="wrapper">
          <div className="left-col">
            {store.loadingArticles ? (
              <span>Loading articles..</span>
            ) : (
              store.articles.map(article => (
                <div className="article" key={article.url}>
                  <a href="#" onClick={e => this.selectArticle(article, e)}>
                    {article.title}
                  </a>
                  <span>{article.score}</span>
                </div>
              ))
            )}
          </div>
          <div className="right-col">
            {store.currentArticle && (
              <React.Fragment>
                <a href={store.currentArticle.url}>
                  <h1>{store.currentArticle.title}</h1>
                </a>

                <div>
                  {store.loadingComments ? (
                    <span>Loading comments..</span>
                  ) : (
                    store.currentArticle.comments.map(c => (
                      <div key={c.id}>
                        <p>{c.text}</p>
                        <p>
                          <b>{c.by}</b> <i>{new Date(c.time * 1000).toLocaleString()}</i>
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default view(IndexPage);
