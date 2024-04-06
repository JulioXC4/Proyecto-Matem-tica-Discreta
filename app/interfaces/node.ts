export class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    children: Node[] | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.children = [];
    }

    public addNode(node: Node): void {
        this.children?.push(node)
    }

    public getChildren() {
        return this.children
    }
}