# pdf-analyzer

AI powered PDF aNALYZER

## Key Features & Benefits

- **File Upload:** Allows users to upload PDF documents.
- **PDF Preview:** Provides a live preview of the uploaded PDF.
- **Chat Interface:** Enables users to interact with the PDF content via a chat-like interface.
- **Intelligent Summarization:** Summarizes the PDF content using the Gemini API, extracting text and image data.
- **Interactive Q&A:** Supports interactive question-and-answer sessions based on the PDF content using the Gemini API.

## Prerequisites & Dependencies

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm or Yarn:** npm comes with Node.js, or you can use Yarn.
- **Next.js:** This project is built on Next.js.
- **React:** The front-end is built with React.
- **TypeScript:** The project is written in TypeScript.
- **Tailwind CSS:** Utilized for styling.
- **Genkit AI:** The project uses Genkit AI for summarization and Q&A.
- **Gemini API Key:** You'll need a Gemini API key to access the language model.

## Installation & Setup Instructions

Follow these steps to get the project up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/004Ongoro/pdf-analyzer
   cd pdf-analyzer
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Using Yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Gemini API key:

   ```
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```

4. **Run the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Using Yarn:

   ```bash
   yarn dev
   ```

   This will start the development server at `http://localhost:9002`.

## Usage Examples

1.  **Upload a PDF:**

    -   Drag and drop a PDF file into the designated area, or click to select a file from your computer.

2.  **View the PDF Preview:**

    -   The PDF will be displayed in the preview section.

3.  **Interact via Chat:**

    -   Use the chat interface to ask questions about the PDF content.
    -   Example: "Summarize this document." or "What are the key findings?"

## Configuration Options

-   **Next.js Configuration:**
    -   `next.config.ts` contains configuration options for Next.js, such as image optimization settings.

-   **Tailwind CSS Configuration:**
    -   `tailwind.config.ts` is where you can customize the Tailwind CSS theme.

-   **.env file**
    - `GEMINI_API_KEY` must be provided for AI functionalities.

## Contributing Guidelines

We welcome contributions! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Test your changes thoroughly.
5.  Submit a pull request with a clear description of your changes.

## Project Structure

```
├── .gitignore
├── .idx
│   ├── dev.nix
│   └── icon.png
├── .modified
├── README.md
├── apphosting.yaml
├── components.json
├── docs
│   └── blueprint.md
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── src
│   ├── ai
│   │   ├── dev.ts
│   │   ├── flows
│   │   └── genkit.ts
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── chat-interface.tsx
│   │   ├── file-uploader.tsx
│   │   ├── logo.tsx
│   │   ├── pdf-preview.tsx
│   │   └── ui
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── lib
│       └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
```

## License Information

License not specified.

## Acknowledgments

-   This project uses [Next.js](https://nextjs.org/) as its web framework.
-   Styling is done with [Tailwind CSS](https://tailwindcss.com/).
-   AI capabilities are provided by [Genkit AI](https://genkit.dev/) and [Google Gemini API](https://ai.google.dev/).
-   PDF rendering is handled by `react-pdf`.
