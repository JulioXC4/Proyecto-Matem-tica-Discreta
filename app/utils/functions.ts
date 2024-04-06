export const createRandomElements = (n: number): number[] => {
    const elements: number[] = [];
    for (let i = 0; i < n; i++) {
      elements.push(Math.floor(Math.random() * 100));
    }
    return elements;
  };