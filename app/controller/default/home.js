'use strict';

const dayjs = require('dayjs');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async test() {
    const { ctx } = this;
    const result = await this.app.mysql.get('article', {});
    ctx.body = result;
  }
  async getArticleList() {
    const sql =
      'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduction as introduction, ' +
      'article.viewCount as viewCount, ' +
      'article.addTime as time, ' +
      'catalog.name as catalogName ' +
      'FROM article LEFT JOIN catalog ON article.catalogId = catalog.id';
    const results = await this.app.mysql.query(sql);
    results.forEach((cur) => {
      cur.time = dayjs(cur.time).format('ddd, MMM D, YYYY');
    });
    console.log('articleList');
    this.ctx.body = { result: results };
  }
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql =
      'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.viewCount as viewCount, ' +
      'article.addTime as time, ' +
      'article.content as content, ' +
      'catalog.name as catalogName ' +
      'FROM article LEFT JOIN catalog ON article.catalogId = catalog.id ' +
      `WHERE article.id = ${id}`;
    const results = await this.app.mysql.query(sql);
    results.forEach((cur) => {
      cur.time = dayjs(cur.time).format('ddd, MMM D, YYYY');
    });
    this.ctx.body = { result: results };
  }
  async getCatalogList() {
    const results = await this.app.mysql.select('catalog');
    this.ctx.body = [...results];
    console.log(this.ctx.body);
  }
}

module.exports = HomeController;
