/* export class Node {
    value: string;
    left: Node | null;
    right: Node | null;
    children: Node[] | null;

    constructor(value: string) {
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
 */
export class Node {
    value: string;
    left: Node | null;
    right: Node | null;

    constructor(value: string) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
