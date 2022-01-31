/* File System Organiser*/

/*Features of the Project -
If you have numerous Files in a folder and they are not Properly arranged.
You can use this tool to arrange them in specific directory according to their extension.
like text files will go into text File Folder .exe files will go into application folder and so on.
So at the end you will have a arranged set of files in specific folders.
*/

import helpFn from "./help.js";
import treeFn from "./tree.js";
import organizeFn from "./organize.js";


const inputArr = process.argv.slice(2);

const command = inputArr[0];

switch (command) {

    case 'tree':
        treeFn(inputArr[1]);
        break;

    case 'organize':
        organizeFn(inputArr[1]);
        break;

    case 'help': helpFn();
        break;

    default: console.log("PLEASE ENTER A VALID COMMAND.");
        break;
}