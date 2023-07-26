// // app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /api/posts', () => {
  it('should return all posts when no search term provided', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body.totalCount).toBe(100); // Total number of posts in mock_data.json
  });

  it('should return filtered posts when search term provided', async () => {
    const response = await request(app).get('/api/posts?q=king');
    expect(response.status).toBe(200);
    expect(response.body.totalCount).toBe(4); 
  });

  it('should return exact match when search term is within double quotes', async () => {
    const response = await request(app).get('/api/posts?q="The Lion King"');
    expect(response.status).toBe(200);
    expect(response.body.totalCount).toBe(1); 
  });

  it('should sort posts by name', async () => {
    const response = await request(app).get('/api/posts?sortBy=name');
    expect(response.status).toBe(200);
    const posts = response.body.posts;
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i].name.localeCompare(posts[i - 1].name)).toBeGreaterThanOrEqual(0);
    }
  });
  
  it('should sort posts by dateLastEdited', async () => {
    const response = await request(app).get('/api/posts?sortBy=dateLastEdited');
    expect(response.status).toBe(200);
    const posts = response.body.posts;
    for (let i = 1; i < posts.length; i++) {
      const date1 = new Date(posts[i].dateLastEdited);
      const date2 = new Date(posts[i - 1].dateLastEdited);
      expect(date1.getTime()).toBeLessThanOrEqual(date2.getTime());
    }
  });
  
  it('should return paginated posts', async () => {
    const response = await request(app).get('/api/posts?page=2');
    expect(response.status).toBe(200);
    expect(response.body.totalPages).toBe(20); 
    expect(response.body.currentPage).toBe(2);
    expect(response.body.posts.length).toBe(5); 
  });

    it('should return the third page of posts', async () => {
    const response = await request(app).get('/api/posts?page=3');
    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(3);
    expect(response.body.totalPages).toBe(20);
    expect(response.body.posts.length).toBe(5);
  });
  
  it('should return the last page of posts', async () => {
    const response = await request(app).get('/api/posts?page=4');
    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(4);
    expect(response.body.totalPages).toBe(20);
    expect(response.body.posts.length).toBe(5); 
  });

  it('should return posts containing "District Solutions Orchestrator" in name or description', async () => {
    const response = await request(app).get('/api/posts?q=District Solutions Orchestrator');
    expect(response.status).toBe(200);
    expect(response.body.posts.length).toBe(1);
    expect(response.body.posts[0].name).toBe('District Solutions Orchestrator');
  });
    
});
