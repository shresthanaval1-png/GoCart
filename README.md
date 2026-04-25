# 🛒 GoCart – Full Stack E-commerce Platform

GoCart is a full-stack e-commerce web application built with modern technologies like **Next.js, Prisma, Clerk, and PostgreSQL**.
It allows users to browse products, add items to cart, and sellers to manage stores and products.

---

## 🚀 Features

### 👤 User Features

* Browse products by category
* Search products
* View product details with multiple images
* Add to cart & manage cart
* Wishlist functionality
* User authentication (Clerk)

### 🏪 Seller Features

* Create store (admin approval system)
* Add, edit, delete products
* Upload multiple product images
* Manage product listings
* Seller dashboard (orders, earnings, products)

### 🛠️ Admin / System Features

* Store approval system
* Secure APIs
* Image upload via ImageKit
* Background jobs (Inngest)

---

## 🧱 Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** PostgreSQL (Neon)
* **ORM:** Prisma
* **Authentication:** Clerk
* **Image Upload:** ImageKit
* **State Management:** Redux Toolkit
* **Background Jobs:** Inngest

---

## 📂 Project Structure

```
app/
 ├── (public)        # User-facing pages
 ├── store           # Seller dashboard
 ├── api             # Backend routes
components/          # UI components
lib/                 # Redux + utilities
prisma/              # Database schema
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=your_database_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

## 🛠️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/gocart.git
cd gocart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database

```bash
npx prisma db push
```

### 4. Run development server

```bash
npm run dev
```

---

## 🌐 Deployment

You can deploy easily using **Vercel**:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy 🚀

---

## 🧪 Key Fixes Implemented

* ✅ Multi-image upload for products
* ✅ Seller approval-based dashboard access
* ✅ Category normalization
* ✅ Fixed Prisma schema issues
* ✅ Improved API validation & error handling

---

## 📸 Screenshots

(Add your screenshots here)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built by Tech Titans

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
