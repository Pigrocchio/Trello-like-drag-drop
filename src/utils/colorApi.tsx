import axios from "axios";

const getColor = async () => {
 
  const urlImages = `http://palett.es/API/v1/palette`;
  const res = await axios.get(urlImages);
    const colors = res.data    
console.log(colors)
  //   colors.matching_colors.map((mapcolor: string) => {
  //   });
  return colors;
};

export { getColor };
