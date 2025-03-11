# PlantDekho - AI-Powered Plant Identification App

PlantDekho is a web application that uses Google's Gemini AI to identify plants from images and provide detailed care instructions and information.

## Features

- 📸 Take photos or upload plant images
- 🔍 AI-powered plant identification
- 🌱 Detailed plant care instructions
- 🌍 Native habitat and growth information
- 📱 Responsive design for all devices

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini AI
- React Webcam

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- A Google Gemini API key

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/plantdekho.git
   cd plantdekho
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
plant-web-app/
│── public/                     # Static assets
│── src/
│   ├── components/            # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API integration
│   ├── styles/               # Global styles
│   └── app/                  # Next.js pages
```

## Environment Variables

- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for plant identification
- Next.js team for the amazing framework
- Tailwind CSS for the styling system
