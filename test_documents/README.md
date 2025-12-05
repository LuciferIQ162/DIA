# Test Documents for DIA

This directory contains complex government documents for testing the Document Intelligence Agent (DIA) system.

## 📋 Available Test Files

### 1. **Government Policy Document** (DOCX, 38KB)
**File:** `government_policy_rural_development.docx`

**Content:**
- Government of Odisha - Rural Development Department
- Integrated Rural Development Scheme 2024-2029
- Complete policy notification with objectives, eligibility, financial provisions
- Implementation timeline across 4 phases
- Budget allocation table (₹1,250 crores)
- Monitoring mechanisms and KPIs
- Penalties and grievance redressal procedures

**Best for testing:**
- Summarization capabilities
- Table extraction
- Multi-section document understanding
- Policy analysis

---

### 2. **Budget Document** (DOCX, 38KB)
**File:** `education_budget_2024-25.docx`

**Content:**
- Odisha State Budget for Department of Education
- Total allocation: ₹18,500 crores
- Detailed budget tables with multiple categories
- 3-year comparative analysis
- New initiatives and performance metrics
- Complex financial data and projections

**Best for testing:**
- Financial data extraction
- Table parsing and analysis
- Year-over-year comparisons
- Numeric data handling

---

### 3. **Bilingual Health Notification** (TXT, 10KB)
**File:** `health_notification_bilingual.txt`

**Content:**
- Complete document in both English and Odia (ଓଡ଼ିଆ)
- Universal Health Coverage Scheme details
- Coverage details, beneficiaries, enrollment process
- Grievance redressal and contact information
- Complex formatting with box drawings

**Best for testing:**
- Bilingual text processing
- Odia language support
- Multi-language output
- Special character handling

---

### 4. **Procurement Tender** (TXT, 13KB)
**File:** `procurement_tender_highway.txt`

**Content:**
- Highway construction tender notice
- Project worth ₹3,450 crores
- Detailed technical specifications
- Eligibility criteria (financial and technical)
- Cost breakdown table
- Timeline, deadlines, and evaluation criteria

**Best for testing:**
- Q&A capabilities
- Information extraction from complex documents
- Technical specification parsing
- Date and numeric extraction

---

## 🧪 Suggested Test Scenarios

### Test 1: Basic Summarization
```
Document: government_policy_rural_development.docx
Task: Summarize
Language: English
Expected: Concise summary of policy objectives and key points
```

### Test 2: Financial Data Extraction
```
Document: education_budget_2024-25.docx
Task: Extract
Query: "Extract all budget allocations and their amounts"
Language: English
Expected: List of all budget line items with amounts
```

### Test 3: Bilingual Processing
```
Document: health_notification_bilingual.txt
Task: Summarize
Language: Bilingual
Expected: Summary in both English and Odia
```

### Test 4: Technical Q&A
```
Document: procurement_tender_highway.txt
Task: Q&A
Query: "What are the eligibility criteria for bidders?"
Language: English
Expected: Detailed list of financial and technical criteria
```

### Test 5: Document Comparison
```
Document 1: government_policy_rural_development.docx
Document 2: education_budget_2024-25.docx
Task: Compare
Language: English
Expected: Comparison of two different government documents
```

---

## 📊 Document Complexity Levels

| Document | Format | Size | Complexity | Key Features |
|----------|--------|------|------------|--------------|
| Rural Development Policy | DOCX | 38 KB | ⭐⭐⭐⭐ | Tables, lists, multi-sections |
| Education Budget | DOCX | 38 KB | ⭐⭐⭐⭐⭐ | Complex tables, financial data |
| Health Notification | TXT | 10 KB | ⭐⭐⭐⭐ | Bilingual, special characters |
| Procurement Tender | TXT | 13 KB | ⭐⭐⭐⭐⭐ | Technical specs, deadlines |

---

## 🎯 Testing Coverage

These documents cover:
- ✅ Multiple file formats (DOCX, TXT)
- ✅ Complex tables and structured data
- ✅ Bilingual content (English + Odia)
- ✅ Financial and numeric data
- ✅ Technical specifications
- ✅ Long-form government documents
- ✅ Various document types (policy, budget, notification, tender)
- ✅ Different complexity levels
- ✅ Real-world government document structures

---

## 🔧 Regenerating Test Files

To regenerate all test documents:

```bash
python3 generate_test_files.py
```

This will overwrite existing test documents with fresh copies.

---

## 📝 Notes

- All documents are realistic simulations of actual government documents
- Financial figures and dates are fictional but realistic
- Documents follow standard government formatting conventions
- Suitable for comprehensive testing of DIA's capabilities
- Safe for testing - no real sensitive information

---

**Generated on:** December 4, 2024  
**For:** Document Intelligence Agent (DIA) Testing
