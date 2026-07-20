# 🍃 CeylonCart — Authentic Sri Lankan Goods, Delivered

**CeylonCart** is a modern e-commerce web application designed for discovering and purchasing authentic Sri Lankan products, including high-grown Ceylon teas, true Ceylon spices, handwoven handicrafts, and traditional batik apparel. Built with **Next.js 16 (App Router)**, **React 19**, and modern CSS styling.

---

## 🌟 Key Features

- **🛒 Product Storefront**: Browse curated Sri Lankan products with real-time category filtering (Teas, Spices, Handicrafts, Apparel) and text search.
- **📦 Dynamic Product Details**: View rich product descriptions, high-quality images, prices in LKR, and custom quantity selection.
- **🛍️ State-Persisted Shopping Cart**: Real-time cart badge counter, item quantity adjustments, item removal, and subtotal calculation stored in browser `localStorage`.
- **💳 Multi-Step Checkout & Payment Flow**:
  - **Checkout Page**: Secure customer shipping address & contact form.
  - **Payment Page**: Payment processing simulation with card input validation.
  - **Order Confirmation**: Instant order receipt display with custom order references (`CC-XXXXXX`).
- **🔑 Role-Based Authentication**: Mock Auth system supporting standard users and admin role management with persistent login sessions.
- **📊 Admin Orders Dashboard**: Dedicated administrator view (`/admin/orders`) to inspect and review all submitted customer orders stored locally.
- **🎨 Premium Visual Aesthetic**: Styled with Google Fonts (`Outfit` & `Inter`), custom micro-interactions, responsive design, and luxury design tokens.

---

## 🏗️ Project Architecture & Directory Structure

```
ceyloncart/
├── app/                          # Next.js App Router Pages & Layouts
│   ├── admin/                    # Admin Dashboard Section
│   │   └── orders/               # Admin Orders Management Page (/admin/orders)
│   │       └── page.js           # Displays submitted orders table & clear option
│   ├── cart/                     # Shopping Cart Page (/cart)
│   │   └── page.js               # Cart items breakdown, subtotal & checkout button
│   ├── checkout/                 # Shipping Information Page (/checkout)
│   │   └── page.js               # Shipping details form & validation
│   ├── confirmation/             # Order Receipt Page (/confirmation)
│   │   └── page.js               # Displays completed order summary & reference code
│   ├── login/                    # Authentication Page (/login)
│   │   └── page.js               # Sign-in interface supporting user & admin roles
│   ├── payment/                  # Payment Processing Page (/payment)
│   │   └── page.js               # Credit/Debit card form & order submission logic
│   ├── product/                  # Dynamic Product Pages
│   │   └── [id]/                 # Dynamic product detail route (/product/[id])
│   │       └── page.js           # Detailed product view & quantity selector
│   ├── favicon.ico               # Site favicon asset
│   ├── globals.css               # Global CSS stylesheet & design system theme tokens
│   ├── layout.js                 # Root layout with font optimization & context providers
│   └── page.js                   # Main Storefront Homepage with catalog & filter bar
│
├── components/                   # Reusable React UI Components
│   ├── CartItem.jsx              # Individual product row in cart view
│   ├── CategoryFilter.jsx        # Pill-style category selection component
│   ├── Navbar.jsx                # Top header navigation bar with cart badge & auth actions
│   └── ProductCard.jsx           # Product display card with image, price & quick-add
│
├── context/                      # React Context API State Providers
│   ├── AuthContext.jsx           # User session state, login/logout actions & role access
│   └── CartContext.jsx           # Reducer-based shopping cart state (add, update, remove, clear)
│
├── data/                         # Static Application Datasets
│   └── products.json             # Catalog dataset of Sri Lankan products (ID, price, image, description)
│
├── lib/                          # Utility Libraries & Helper Functions
│   └── orderId.js                # Custom order ID generator (Format: CC-XXXXXX)
│
├── public/                       # Static Public Assets
│   └── images/                   # Product image assets (black tea, cinnamon, batik, etc.)
│
├── next.config.mjs               # Next.js configuration
├── package.json                  # Node.js dependencies & runtime scripts
├── postcss.config.mjs            # PostCSS configuration for CSS processing
└── README.md                     # Project technical documentation
```

---

## 📂 Detailed Folder & File Guide

### 1. `app/` — Application Routes (App Router)
- **`app/layout.js`**: The global container wrap. Configures metadata, Google Fonts (`Outfit`, `Inter`), and wraps the application inside `AuthProvider` and `CartProvider`.
- **`app/page.js`**: The main storefront. Fetches products from `data/products.json`, enables category filtering (Tea, Spices, Handicrafts, Apparel), and renders product cards.
- **`app/product/[id]/page.js`**: Dynamic route for single product details. Allows users to adjust quantity before adding items to their cart.
- **`app/cart/page.js`**: Overview of items currently in the cart, subtotal calculation, quantity adjustments, and navigation link to checkout.
- **`app/checkout/page.js`**: Shipping information form where customers enter their contact details and delivery address.
- **`app/payment/page.js`**: Finalizes the purchase by simulating payment collection and writing the order into local storage.
- **`app/confirmation/page.js`**: Displays an invoice/receipt after successful order placement with the generated order ID.
- **`app/admin/orders/page.js`**: Admin-only panel that lists all completed customer orders stored in `localStorage` under `ceyloncart_orders`.

### 2. `components/` — UI Components
- **`Navbar.jsx`**: Persistent navigation header showing the CeylonCart logo, navigation links, live cart item badge count, and user sign-in/sign-out status.
- **`ProductCard.jsx`**: Card component displaying product image, title, category tag, price in LKR, and "Add to Cart" CTA.
- **`CartItem.jsx`**: Renders each line item inside the `/cart` page with increment/decrement buttons and a remove action.
- **`CategoryFilter.jsx`**: Interactive pill buttons allowing users to filter products by category on the homepage.

### 3. `context/` — State Management
- **`CartContext.jsx`**: Uses React `useReducer` to manage cart actions (`ADD_TO_CART`, `REMOVE_FROM_CART`, `UPDATE_QUANTITY`, `CLEAR_CART`). Synchronizes with browser `localStorage` key `ceyloncart_cart`.
- **`AuthContext.jsx`**: Manages mock authentication state with predefined user accounts (`admin@ceyloncart.lk`, `demo@ceyloncart.lk`). Synchronizes with `localStorage` key `ceyloncart_auth`.

### 4. `data/` & `lib/`
- **`data/products.json`**: JSON file serving as the mock database for items available in the shop.
- **`lib/orderId.js`**: Exported helper function `generateOrderId()` that produces unique order alphanumeric reference strings (e.g. `CC-9A2X7L`).

---

## 💾 LocalStorage Data Schema

CeylonCart runs fully on the client-side without requiring a backend database. Data persistence is handled via browser `localStorage`:

| Key | Type | Description |
|---|---|---|
| `ceyloncart_cart` | `Array<CartItem>` | Stores active items in the cart: `[{ productId, name, price, image, quantity }]` |
| `ceyloncart_auth` | `Object` | Stores current user session: `{ loggedIn: boolean, email: string, role: 'user' \| 'admin' }` |
| `ceyloncart_orders` | `Array<Order>` | Stores completed customer orders: `[{ orderId, customerName, email, items, total, placedAt }]` |

---

## 🔑 Demo Login Accounts

| Email | Password | Role | Access |
|---|---|---|---|
| `admin@ceyloncart.lk` | `admin123` | **Admin** | Full store access + Admin Orders Dashboard (`/admin/orders`) |
| `demo@ceyloncart.lk` | `demo123` | **User** | Standard customer access |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: Modern CSS / Tailwind CSS v4
- **State Management**: React Context API + `useReducer`
- **Fonts**: Google Fonts (`Outfit` & `Inter`)

---

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js 18.x** or higher installed on your system.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ceyloncart.git
cd ceyloncart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe / PayHere).
- [ ] Backend database connection (MongoDB / PostgreSQL via Prisma or Drizzle).
- [ ] Product review and star rating system.
- [ ] Wishlist functionality.
- [ ] International shipping calculator & multi-currency support (USD, EUR, LKR).
