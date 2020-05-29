import axios from "axios";


const getImages = async () => {
  const page = Math.floor(Math.random() * 20 + 1);
  const urlImages = `https://api.unsplash.com/search/photos?page=${page}&query=Landscape&client_id=lbxNnSa7rMUFhzJTFptbMgRne30G84iKZszBhOjnAcA`;
  ;

  const res = await axios.get(urlImages);
  const photos = res.data.results.map((image: any) => ({
    id: image.id,
    thumb: image.urls.thumb,
    full: image.urls.full,
    user: {
      username: image.user.username,
      link: image.user.links.html,
    },
  }));
  
  return photos;
};

export { getImages };
