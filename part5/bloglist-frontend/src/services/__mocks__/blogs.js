const blogs = [
  {
    "user": {
      "username": "lytovka",
      "name": "Ivan Lytovka",
      "id": "5d35f3456cfd46460481ec26"
    },
    "author": " Ivan Lytovka",
    "title": "Test post number 2",
    "url": "lytovka.com",
    "likes": 10,
    "id": "5d3601523171fd1924df5f50"
  },
  {
    "user": {
      "username": "lytovka",
      "name": "Ivan Lytovka",
      "id": "5d35f3456cfd46460481ec26"
    },
    "author": "Ivan Lytovka",
    "title": "Test post number 3",
    "url": "lytovka.com",
    "likes": 10,
    "id": "5d36547b0c6ab13b5c7c8329"
  },
  {
    "user": {
      "username": "lytovka",
      "name": "Ivan Lytovka",
      "id": "5d35f3456cfd46460481ec26"
    },
    "author": "Ivan Lytovka",
    "title": "Test post number 3",
    "url": "lytovka.com",
    "likes": 10,
    "id": "5d36547b0c6ab13b5c7c8329"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };