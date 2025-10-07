// import formatDate from "./formatDate.js";
// import fs from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

// console.log(formatDate());

// fs.readFile("./src/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })
// const data = fs.readFileSync("./src/file.txt");
// console.log(data);
// fs.readFile("./src/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// const buffer = await fs.readFile("./src/file.txt");
// console.log(buffer.toString());
// const filepath = path.join("src", "file.txt");
const filepath = path.resolve("src", "file.txt");
// const text = await fs.readFile(filepath, "utf-8");
// console.log(text);
// await fs.appendFile(filepath, "\nPractice Node.js");
// await fs.writeFile(filepath, "Don't forget Node.js");
// await fs.appendFile("./src/file2.txt", "\nPractice Node.js");
// await fs.writeFile("./src/file3.txt", "Don't forget Node.js");
await fs.unlink("./src/file3.txt");


