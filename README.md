# Media Converter

A web-based media converter application built with Next.js that allows users to convert various media files (audio, video, and images) between different formats. The application uses FFmpeg for media processing and provides a modern, user-friendly interface.

## Features

- Convert images between formats (jpg, jpeg, png, gif, bmp, webp, etc.)
- Convert videos to different formats (mp4, avi, mov, mkv, etc.)
- Convert videos to audio formats
- Convert audio files between formats (mp3, wav, ogg, aac, etc.)
- Drag and drop interface
- Real-time conversion status
- Batch conversion support
- Download converted files individually or all at once

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- FFmpeg
- Radix UI Components
- React Dropzone

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/media-converter.git
cd media-converter
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
