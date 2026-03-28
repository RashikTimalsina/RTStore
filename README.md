#  RTStore — Full Stack E-Commerce Platform

A modern full-stack e-commerce web application built with **React** on the frontend and **Spring Boot** on the backend, powered by **MySQL** as the database.

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 + Vite | UI framework & build tool |
| Tailwind CSS 4 | Styling |
| React Router DOM | Client-side routing |
| Axios | HTTP requests to backend |
| React Toastify | Toast notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Spring Boot 4 | REST API framework |
| Spring Security | Security configuration |
| Spring Data JPA | Database ORM |
| Hibernate 7 | JPA implementation |
| MySQL | Relational database |
| Lombok | Boilerplate reduction |
| JJWT | JWT library (ready for auth) |

---

##  Features

-  Browse products with category filtering and search
-  Product detail page with full info
-  Add to cart, remove, adjust quantity
-  Checkout with shipping details form
-  Orders persisted to MySQL database
-  Loading states and error handling
-  Empty cart protection on checkout
-  Fully responsive UI

---

##  Project Structure
```
RTStore/
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── components/        
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── SearchFilter.jsx
│   │   ├── pages/            
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── OrderConfirmation.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx 
│   │   └── services/
│   │       └── api.js       
│   └── package.json
│
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/com/eshopping/backend/
│   │   ├── controller/       
│   │   ├── service/          
│   │   ├── repository/        
│   │   ├── entity/          
│   │   ├── dto/              
│   │   └── config/             
│   └── pom.xml
│
└── README.md
```

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Fetch all products |
| `GET` | `/api/products/{id}` | Fetch single product |
| `POST` | `/api/orders` | Place an order |

### Order Request Body
```json
{
  "shippingName": "Rashik Timalsina",
  "shippingAddress": "Imadol,Lalitpur",
  "shippingCity": "Kathmandu",
  "shippingZip": "44600",
  "totalAmount": 199999.00,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 199999.00
    }
  ]
}
```

---

##  Database Schema

### `products`
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-generated |
| name | VARCHAR(255) | Product name |
| description | TEXT | Product description |
| price | DECIMAL(38,2) | Product price |
| image | VARCHAR(500) | Image URL |
| category | VARCHAR(255) | Product category |

### `orders`
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-generated |
| shipping_name | VARCHAR | Recipient name |
| shipping_address | VARCHAR | Delivery address |
| shipping_city | VARCHAR | City |
| shipping_zip | VARCHAR | Pin/ZIP code |
| total_amount | DECIMAL | Order total |
| created_at | DATETIME | Order timestamp |

### `order_items`
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-generated |
| order_id | BIGINT (FK) | References orders |
| product_id | BIGINT | Product reference |
| quantity | INT | Quantity ordered |
| price | DECIMAL | Price at time of order |

---

##  Getting Started

### Prerequisites
- Node.js 20+
- Java 17+ (or Java 21)
- MySQL 8+
- Maven

---

### 🗃️ Database Setup
```sql
CREATE DATABASE eshopping_db;
```

Then insert products manually or via SQL seed script.

---

### 🔧 Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Configure `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/eshopping_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
server.port=8080
```

3. Run the backend:
```bash
./mvnw spring-boot:run
```

Backend runs at: `http://localhost:8080`

---

###  Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API base URL in `src/services/api.js`:
```javascript
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});
```

4. Run the frontend:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

##  Security Note

`application.properties` contains sensitive credentials and is excluded from this repository via `.gitignore`. Create your own `application.properties` using the template above before running the backend.

---

##  Architecture
```
React (localhost:5173)
        ↓  HTTP / JSON (Axios)
Spring Boot REST API (localhost:8080)
        ↓  JPA / Hibernate
MySQL Database (eshopping_db)
```

---

##  Author

**Rashik Timalsina**
- GitHub: [@rashiktimalsina](https://github.com/rashiktimalsina)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).