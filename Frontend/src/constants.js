export const LANGUAGE_VERSIONS = {
  javascript: "Node",
  typescript: "TS",
  python: "Python",
  java: "Java",
  csharp: "C#",
  php: "PHP",
};

export const CODE_SNIPPETS = {
javascript: `
function greet() {
    console.log("Hello World !");
}

greet();
`,

  typescript: `
function greet(): void {
    console.log("Hello World !");
}

greet();
`,

  python: `
def greet():
    print("Hello World !")

greet()
`,

  java: `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World !");
    }
}
`,

  csharp: `
using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello World !");
    }
}
`,

  php: `<?php
echo "Hello World !";
?>`,
};