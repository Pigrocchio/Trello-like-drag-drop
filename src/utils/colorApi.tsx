import axios from "axios";

const getColor = async () => {
 
  const urlImages = `http://www.colr.org/json/colors/random/8`;
  const res = await axios.get(urlImages);
    const colors = res.data    

    colors.matching_colors.map((mapcolor: string) => {
    });
  return colors.matching_colors;
};

export { getColor };
