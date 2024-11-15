import { instance } from '@/contexts/axios';

export const createBlogCategory = async (category) => {
    const newCategory = await instance
        .post('/admin/article-categories', category)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return newCategory;
};

export const getBlogCategories = async () => {
    const categories = await instance
        .get('/admin/article-categories')
        .then(({ data }) => {
            return data?.articleCategories;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return categories;
};

export const getBlogCategory = async (id) => {
    const blogCategory = await instance
        .get(`/admin/article-categories/${id}`)
        .then(({ data }) => {
            return data.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return blogCategory;
};

export const deleteBlogCategory = async (id) => {
    const deletedCategory = await instance
        .delete(`/admin/article-categories/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return deletedCategory;
};

export const updateBlogCategory = async (id, category) => {
    const updatedCategory = await instance
        .put(`/blog-categories?id=${id}`, category)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return updatedCategory;
};

export const createPost = async (post) => {
    const newPost = await instance
        .post('/admin/article', post)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return newPost;
};

export const getPosts = async () => {
    const posts = await instance
        .get('/admin/article')
        .then(({ data }) => {
            return data.articles;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return posts;
};

export const getPost = async (id) => {
    const post = await instance
        .get(`/admin/article/${id}`)
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return post;
};

export const deletePost = async (id) => {
    const deletedPost = await instance
        .delete(`/admin/article/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return deletedPost;
};

export const updatePost = async (id, post) => {
    const updatedPost = await instance
        .put(`/admin/article/${id}`, post)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    return updatedPost;
};
