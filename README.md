# PixelNoSekai

A personal image manager built with **Next.js**, **Prisma**, **Tailwind CSS**, **TypeScript**, and **MySQL**. Store images with notes and manage them easily.

## Sample Screenshot

![Sample Screenshot](https://github.com/user-attachments/assets/3e1a1ab1-e7a2-43dd-83fb-92a23dab6ae5)

## Features

* Upload and store images
* Add and edit notes for each image
* View and manage stored images
* Responsive UI with Tailwind CSS

## Tech Stack

* Next.js
* Prisma
* MySQL
* Tailwind CSS
* TypeScript

## Getting Started

### Prerequisites

* Node.js (v18+)
* MySQL database

### Installation

```bash
git clone https://github.com/PavishK/PixelNoSekai.git
cd PixelNoSekai
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
AUTH_SECRET=""
AUTH_CLIENT_ID=""
AUTH_CLIENT_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

### Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Run the App

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## License

MY License
