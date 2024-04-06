import { Node } from "../interfaces/node";

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
export function convertToBinaryTree(root: Node | null): Node | null {
    if (!root || !root.children || root.children.length === 0) {
        return root;
    }

    // Si el nodo tiene más de dos hijos, creamos nuevos nodos intermedios para distribuir los hijos adicionales.
    while (root.children.length > 2) {
        //@ts-ignore
        const newNode = new Node(root.children[1].value);
        newNode.children = root.children.slice(1, 3);
        root.children = [root.children[0], newNode, ...root.children.slice(3)];
    }

    // Recursivamente convertimos los hijos del nodo actual a árboles binarios.
    if (root.children) {
        root.children.forEach(child => {
            convertToBinaryTree(child);
        });
    }

    return root;
}