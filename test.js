import os from "os";
import fs from "fs";
var user = os.userInfo();
console.log(user);

fs.appendFile("test.txt", "file is created", () => {});
