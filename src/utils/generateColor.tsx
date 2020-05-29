


function generateRandomColor(n: number) {
    let colorArr = [] as any;
  for (let i = 0; i < n; i++) {
    let randomColor:string = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colorArr.push(randomColor);
  }
   return colorArr
}

export { generateRandomColor }
