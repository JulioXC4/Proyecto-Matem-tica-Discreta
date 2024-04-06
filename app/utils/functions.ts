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
export function convertToBinaryTree(rootNode: Node | null): Node | null {
     if (!rootNode || !rootNode.children) {
        // Si el nodo es nulo o no tiene hijos, no necesitamos hacer nada.
        return rootNode;
    }

    if (rootNode.children.length > 2) {
        // Si el nodo ya tiene 2 o menos hijos, no necesitamos hacer ninguna modificación.
        rootNode.children.forEach(child => {
            convertToBinaryTree(child); // Llamamos recursivamente a cada hijo.
        });
        return rootNode;
    }

    // Creamos un nuevo nodo para actuar como la raíz del árbol binario.
    const newRoot = new Node(rootNode.value);

    // Creamos dos nuevas listas de hijos para los nodos izquierdo y derecho del nuevo nodo raíz.
    const leftChildren: Node[] = [];
    const rightChildren: Node[] = [];

    // Distribuimos los hijos del nodo original entre las listas izquierda y derecha.
    rootNode.children.forEach((child, index) => {
        if (index < 2) {
            rightChildren.push(child);
        } else {
            leftChildren.push(child);
        }
    });

    // Limpiamos los hijos del nodo original.
    rootNode.children = [];

    // Asignamos los hijos adecuados al nuevo nodo raíz.
    rightChildren.forEach(child => newRoot.addNode(child));
    leftChildren.forEach(child => rootNode.addNode(child));

    // Llamamos recursivamente a la función para reorganizar los hijos.
    convertToBinaryTree(newRoot);
    convertToBinaryTree(rootNode);

    return newRoot;

}

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