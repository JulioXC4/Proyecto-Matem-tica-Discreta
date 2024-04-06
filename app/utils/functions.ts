export const createRandomElements = (n: number): number[] => {
    const elements: number[] = [];
    const uniqueValues = new Set<number>();

    while (elements.length < n) {
        const randomValue = Math.floor(Math.random() * 100);
        if (!uniqueValues.has(randomValue)) {
            elements.push(randomValue);
            uniqueValues.add(randomValue);
        }
    }

    return elements;
};