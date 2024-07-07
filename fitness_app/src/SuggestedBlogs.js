import { useState } from 'react';
import axios from 'axios';
import { Card, List, Input, Button } from 'antd';

const newsSearchUrl = 'https://newsapi.org/v2/everything';
const apiKey = '745fb3e8384f43ed8a55c7b9c40c844b';
const perPage = 9; // Number of articles to show per page

export function SuggestedBlogs() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchClick = async (searchQuery= 'healthy') => {
    try {
      const response = await axios.get(newsSearchUrl, {
        params: {
          q: searchQuery,
          language: 'en',
          page: currentPage,
          pageSize: perPage,
          sortBy: 'relevancy',
          apiKey: apiKey
        }
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
      setArticles([]);
    }
  };

  return (
    <div style={{ padding: '24px',minWidth: '94vw', minHeight: '100vh', maxHeight:"fit-content"  }}>
      <h1>Blogs and Articles </h1>
      <Input
        placeholder="Search for health articles"
        style={{ marginBottom: '16px' }}
      />
      <Button type="primary" onClick={() => handleSearchClick()}>
        Search
      </Button>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={articles}
        renderItem={(article) => (
          <List.Item>
            <Card title={article.title} extra={<a href={article.url}>Read More</a>}>
              <div>{article.description}</div>
            </Card>
          </List.Item>
        )}
        pagination={{
          current: currentPage,
          pageSize: perPage,
          onChange: handlePageChange,
          total: 100 // You can replace this with the total number of articles available
        }}
        style={{ marginTop: '16px' }}
      />
    </div>
  );
}