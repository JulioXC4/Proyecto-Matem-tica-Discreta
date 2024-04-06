export class Node {
    value: number;
    left: Node | null;
    right: Node | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    add(value: number): void {
        if (value < this.value) {
            this.addToTheLeft(value);
        } else {
            this.addToTheRight(value);
        }
    }

    private addToTheLeft(value: number): void {
        if (this.left) {
            this.left.add(value);
        } else {
            this.left = new Node(value);
        }
    }

    private addToTheRight(value: number): void {
        if (this.right) {
            this.right.add(value);
        } else {
            this.right = new Node(value);
        }
    }
  }