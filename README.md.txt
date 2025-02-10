# PS5 WebKit Exploit

This project allows you to take full control of a PS5 by exploiting a vulnerability in WebKit. It disables system protections (ASLR, DEP), injects an ELF shell, and provides root access to the console.

## Features

- **Disables ASLR and DEP**: Bypasses system protections to allow code injection.
- **Injects an ELF shell**: Executes commands on the PS5.
- **Dumps kernel memory**: Extracts memory for further analysis.
- **Robust ROP chain**: Uses ROP gadgets to fully control the PS5.

## Requirements

- PS5 with firmware version 10.40 or earlier.
- A browser that allows JavaScript execution in the PS5 environment.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/exploit-ps5.git
    cd exploit-ps5
    ```

2. Open `index.html` in your PS5 browser.

## Usage

1. Click the "Launch Exploit" button in the `index.html` file.
2. The exploit will disable ASLR and DEP, inject an ELF shell, and provide root access to the PS5.

## License

This project is licensed under the [MIT License](LICENSE).
