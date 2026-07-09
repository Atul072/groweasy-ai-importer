# 🚀 GrowEasy AI CSV Importer

An AI-powered CSV Importer built using **Next.js, Express.js, MongoDB, Gemini AI, and Tailwind CSS**. It allows users to upload CSV files, preview data, intelligently map fields into a CRM format, and save the data into MongoDB.

---

## ✨ Features

- 📂 Upload CSV files
- 👀 CSV Preview
- 🤖 AI-based CRM field mapping (Gemini AI)
- 🔄 Automatic fallback mapping
- 📊 Import Summary
- 🔍 Search records
- 📄 Pagination
- 📥 Download mapped data as JSON
- 📥 Download mapped data as CSV
- 💾 Save imported data into MongoDB
- 📦 Batch Processing (100 records per batch)
- ❌ Skip invalid records (missing Email & Mobile)

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Axios
- PapaParse
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Gemini AI API

---

## 📂 Project Structure

```text
groweasy-ai-importer
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── prompts
│   ├── routes
│   ├── services
│   ├── utils
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/Atul072/groweasy-ai-importer.git
```

```bash
cd groweasy-ai-importer
```

---

## 2. Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/groweasy

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run Backend

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend will start on

```
http://localhost:3000
```

---

# 📄 CSV Format

Example CSV

```csv
Name,Email,Mobile,Company,City,State,Country
Rahul Sharma,rahul@gmail.com,9876543210,TCS,Indore,Madhya Pradesh,India
Priya Verma,priya@gmail.com,9988776655,Infosys,Bangalore,Karnataka,India
```

---

# 🔄 Import Workflow

```text
Upload CSV
      │
      ▼
CSV Parsing
      │
      ▼
AI CRM Mapping
      │
      ▼
Validation
      │
      ▼
MongoDB Storage
      │
      ▼
Import Summary
```

---

# 📊 CRM Fields

- created_at
- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- lead_owner
- crm_status
- crm_note
- data_source
- possession_time
- description

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- CSV Upload
- CSV Preview
- Import Summary
- MongoDB Compass

---

# 🚀 Future Improvements

- Duplicate Detection
- Import History
- Undo Last Import
- Export Excel
- Authentication
- Dashboard Analytics

---

# 👨‍💻 Author

**Atul Patel**

GitHub: https://github.com/Atul072

---

# 📄 License

This project is for learning and internship assignment purposes.