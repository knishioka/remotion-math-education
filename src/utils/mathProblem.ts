export interface CalculationStep {
  position: number;
  digit1: number;
  digit2: number;
  carry: number;
  sum: number;
  resultDigit: number;
  newCarry: number;
  explanation: string;
}

export interface MathProblem {
  num1: number;
  num2: number;
  answer: number;
  hasCarry: boolean;
  steps: CalculationStep[];
  displayText: string;
}

export function createMathProblem(num1: number, num2: number): MathProblem {
  const answer = num1 + num2;
  const hasCarry = checkCarryOver(num1, num2);
  const steps = calculateSteps(num1, num2);

  return {
    num1,
    num2,
    answer,
    hasCarry,
    steps,
    displayText: `${num1} + ${num2} = ?`
  };
}

function checkCarryOver(num1: number, num2: number): boolean {
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const maxLength = Math.max(num1Str.length, num2Str.length);

  let carry = 0;
  for (let i = 0; i < maxLength; i++) {
    const digit1 = i < num1Str.length ? parseInt(num1Str[num1Str.length - 1 - i]) : 0;
    const digit2 = i < num2Str.length ? parseInt(num2Str[num2Str.length - 1 - i]) : 0;
    
    const sum = digit1 + digit2 + carry;
    if (sum >= 10) {
      return true;
    }
    carry = Math.floor(sum / 10);
  }
  return false;
}

function calculateSteps(num1: number, num2: number): CalculationStep[] {
  const steps: CalculationStep[] = [];
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const maxLength = Math.max(num1Str.length, num2Str.length);

  let carry = 0;

  for (let i = 0; i < maxLength; i++) {
    const digit1 = i < num1Str.length ? parseInt(num1Str[num1Str.length - 1 - i]) : 0;
    const digit2 = i < num2Str.length ? parseInt(num2Str[num2Str.length - 1 - i]) : 0;
    
    const sum = digit1 + digit2 + carry;
    const resultDigit = sum % 10;
    const newCarry = Math.floor(sum / 10);

    const step: CalculationStep = {
      position: i,
      digit1,
      digit2,
      carry,
      sum,
      resultDigit,
      newCarry,
      explanation: generateStepExplanation(digit1, digit2, carry, sum, resultDigit, newCarry, i)
    };

    steps.push(step);
    carry = newCarry;
  }

  // 最終的な繰り上がりがある場合
  if (carry > 0) {
    steps.push({
      position: maxLength,
      digit1: 0,
      digit2: 0,
      carry,
      sum: carry,
      resultDigit: carry,
      newCarry: 0,
      explanation: `最後に繰り上がりの${carry}を書きます`
    });
  }

  return steps;
}

function generateStepExplanation(
  digit1: number, 
  digit2: number, 
  carry: number, 
  sum: number, 
  resultDigit: number, 
  newCarry: number, 
  position: number
): string {
  const placeNames = ['1の位', '10の位', '100の位'];
  const placeName = position < placeNames.length ? placeNames[position] : `${Math.pow(10, position)}の位`;

  let explanation = `${placeName}: `;

  if (carry > 0) {
    explanation += `${digit1} + ${digit2} + ${carry}(繰り上がり) = ${sum}`;
  } else {
    explanation += `${digit1} + ${digit2} = ${sum}`;
  }

  if (newCarry > 0) {
    explanation += `\n${sum}は10以上なので、${resultDigit}を書いて、${newCarry}を次の桁に繰り上げます`;
  } else {
    explanation += `\n答えは${resultDigit}です`;
  }

  return explanation;
}