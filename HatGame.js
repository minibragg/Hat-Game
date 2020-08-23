const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray) {
    this._fieldArray = fieldArray;
  }
  get fieldArray() {
    return this._fieldArray;
  }
  print() {
    this._fieldArray.forEach(line => console.log(line.join('')));
  }
  static generateField(fieldWidth, fieldHeight, percentage) {
    let outputField = [];
    let firstLine = [];
    let finalLine = [];

    for (let i = 1; i < fieldWidth; i++) {
      firstLine.push('░');
    }
    const startPos = Math.floor(Math.random()*fieldWidth);
    if (startPos === fieldWidth) {
      firstLine.push('*');
    } else {
      firstLine.splice(startPos, 0, '*');
    }
    outputField.push(firstLine);

    for (let p = 1; p < (fieldHeight - 1); p++) {
      let middleLine = [];
      for (let j = 0; j < fieldWidth; j++) {
        let tileChoice = Math.floor(Math.random()*100);
        if (tileChoice <= percentage) {
          middleLine.push('O');
        } else {
          middleLine.push('░');
        }
      }
      outputField.push(middleLine);
    }
  
    for (let j = 1; j < fieldWidth; j++) {
      let tileChoice = Math.floor(Math.random()*100);
      if (tileChoice <= percentage) {
        finalLine.push('O');
      } else {
        finalLine.push('░');
      }
    }
    const endPos = Math.floor(Math.random()*fieldWidth);
    if (endPos === fieldWidth) {
      finalLine.push('^');
    } else {
      finalLine.splice(startPos, 0, '^');
    }
    outputField.push(finalLine);

    return outputField;
  }
}

const chooseWidth = prompt('Input Road Width ');
const chooseLength = prompt('Input Road Length ');
const chooseDifficulty = prompt('Input Difficulty (1-100) ');

const myField = new Field(Field.generateField(chooseWidth, chooseLength, chooseDifficulty));

myField.print();

let endGameState = false;

let startVal = myField.fieldArray[0].findIndex(function(element) {
  return element === '*';
});

let xValue = startVal;
let yValue = 0;


while (!endGameState) {
  const playerMove = prompt('Which direction do you want to move? (l,r,u,d) ');

  if (playerMove === 'r'){
    if (myField.fieldArray[yValue][xValue + 1] === '░') {
      myField.fieldArray[yValue][xValue + 1] = '*';
      xValue += 1;
      myField.print();
    } else if (myField.fieldArray[yValue][xValue + 1] === 'O') {
      console.log('You fell down a hole!');
      endGameState = true;
    } else if (myField.fieldArray[yValue][xValue + 1] === '^') {
      console.log('Congrats! You found your hat.');
      endGameState = true;
    } else if (myField.fieldArray[yValue][xValue + 1] === '*') {
      console.log("Can't go backwards!");
    } else if (xValue + 1 === myField.fieldArray[yValue].length) {
      console.log("Can't go out of bounds!");
      endGameState = true;
    } 
  } else if (playerMove === 'l') {
    if (myField.fieldArray[yValue][xValue - 1] === '░') {
      myField.fieldArray[yValue][xValue - 1] = '*';
      xValue -= 1;
      myField.print();
    } else if (myField.fieldArray[yValue][xValue - 1] === 'O') {
      console.log('You fell down a hole!');
      endGameState = true;
    } else if (myField.fieldArray[yValue][xValue - 1] === '^') {
      console.log('Congrats! You found your hat.');
      endGameState = true;
    } else if (myField.fieldArray[yValue][xValue - 1] === '*') {
      console.log("Can't go backwards!");
    } else if (xValue - 1 === -1) {
      console.log("Can't go out of bounds!");
      endGameState = true;
    }
  } else if (playerMove === 'u') {
    if (yValue - 1 === -1) {
      console.log("Can't go out of bounds!");
      endGameState = true;
    } else if (myField.fieldArray[yValue - 1][xValue] === 'O') {
      console.log('You fell down a hole!');
      endGameState = true;
    } else if (myField.fieldArray[yValue - 1][xValue] === '^') {
      console.log('Congrats! You found your hat.');
      endGameState = true;
    } else if (myField.fieldArray[yValue - 1][xValue ] === '*') {
      console.log("Can't go backwards!");
    } else if (myField.fieldArray[yValue - 1][xValue] === '░') {
      myField.fieldArray[yValue - 1][xValue] = '*';
      yValue -= 1;
      myField.print();
    }
  } else if (playerMove === 'd') {
    if (yValue + 1 === myField.fieldArray.length) {
      console.log("Can't go out of bounds!");
      endGameState = true;
    } else if (myField.fieldArray[yValue + 1][xValue] === 'O') {
      console.log('You fell down a hole!');
      endGameState = true;
    } else if (myField.fieldArray[yValue + 1][xValue] === '^') {
      console.log('Congrats! You found your hat.');
      endGameState = true;
    } else if (myField.fieldArray[yValue + 1][xValue ] === '*') {
      console.log("Can't go backwards!");
    } else if (myField.fieldArray[yValue + 1][xValue] === '░') {
      myField.fieldArray[yValue + 1][xValue] = '*';
      yValue += 1;
      myField.print();
    }
  }
}









