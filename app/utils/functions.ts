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

export function convert(root: Node): Node | null {
    if (!root) {
        return null;
      }
    
      if (root.children?.length === 0) {
        return root;
      }
    
      if (root.children?.length === 1) {
        root.left = convert(root.children[0]);
        return root;
      }
    
      root.left = convert(root.children[0]);
      root.right = convert(root.children[1]);
    
      let currentRight = root.right;
      while (currentRight?.right !== null) {
        currentRight = currentRight.right;
      }
    
      for (let i = 2; i < root.children.length; i++) {
        currentRight.right = convert(root.children[i]);
        currentRight = currentRight.right;
      }
    
      return root;
  }