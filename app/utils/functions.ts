// @ts-nocheck
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

export function convert(node: Node): Node | null {
    if (!node) {
        return null;
    }

    if (node.children?.length === 0) {
        return node;
    }

    if (node.children?.length === 1) {
        node.left = convert(node.children[0]);
        return node;
    }

    node.left = convert(node.children[0]);
    node.right = convert(node.children[1]);

    let currentRight = node.right;
    while (currentRight?.right !== null) {
        currentRight = currentRight.right;
    }

    for (let i = 2; i < node.children.length; i++) {
        currentRight.right = convert(node.children[i]);
        currentRight = currentRight.right;
    }

    return node;
}

export function generateNodeTable(root: Node | null): NodeTable[] {
    const nodeTable: NodeTable[] = [];

    function traverse(node: Node | null) {
        if (!node) return;

        const tableEntry: NodeTable = {
            left: node.left ? node.left.value : null,
            data: node.value,
            right: node.right ? node.right.value : null,
        };

        nodeTable.push(tableEntry);

        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);

    return nodeTable;
}

function insertNode(root: Node | null, value: string): void {
    if (root === null) {
      root = new Node(value);
    } else {
      if (value.localeCompare(root.value) < 0) {
        if (root.left === null) {
          root.left = new Node(value);
        } else {
          insertNode(root.left, value);
        }
      } else {
        if (root.right === null) {
          root.right = new Node(value);
        } else {
          insertNode(root.right, value);
        }
      }
    }
  }