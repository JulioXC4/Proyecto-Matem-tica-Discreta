export class Node {
    value: number;
    children: Node[] | null;

    constructor(value: number) {
        this.value = value;
        this.children = [];
    }

    public addNode(node: Node): void {
        this.children?.push(node)
    }

    public getChildren(){
        return this.children
    }
  }