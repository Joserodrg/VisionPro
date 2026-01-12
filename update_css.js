const fs = require('fs');
const path = 'c:\\Users\\joser\\OneDrive\\Documentos\\DAW\\marketing-videos-web\\ficha_overlay.css';
const content = `/* Force override of any lingering styles */
.ficha-btn {
    background: #f8f9fa !important; /* Bootstrap light */
    color: #212529 !important;
    border: 1px solid #dee2e6 !important;
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.ficha-btn:hover {
    background-color: #e2e6ea !important;
    border-color: #dae0e5 !important;
    color: #000 !important;
    transform: translateY(-1px);
}

/* Modal Overlay */
.ficha-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 9999;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 20px;
}

.ficha-modal.active {
    display: flex;
    opacity: 1;
}

/* Modal Content */
.ficha-content {
    background: #ffffff;
    color: #1f2937;
    width: 100%;
    max-width: 600px;
    border-radius: 16px;
    padding: 2.5rem;
    position: relative;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: scale(0.95);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    max-height: 90vh;
    overflow-y: auto;
}

.ficha-modal.active .ficha-content {
    transform: scale(1);
}

/* Close Button */
.ficha-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: transparent;
    border: none;
    color: #9ca3af;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0;
}

.ficha-close:hover {
    color: #111827;
    background-color: #f3f4f6;
}

/* Title */
.ficha-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
    color: #111827;
    font-weight: 700;
    padding-right: 2.5rem;
    line-height: 1.2;
}

/* Data Table */
.ficha-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
}

.ficha-table th, 
.ficha-table td {
    padding: 1rem 0.5rem;
    text-align: left;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.95rem;
}

.ficha-table tr:last-child th,
.ficha-table tr:last-child td {
    border-bottom: none;
}

.ficha-table th {
    width: 35%;
    color: #6b7280;
    font-weight: 500;
    vertical-align: top;
}

.ficha-table td {
    color: #111827;
    font-weight: 500;
    line-height: 1.5;
}

/* Prompt Highlight */
.prompt-box {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    margin-top: 1rem;
}

.prompt-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6366f1;
    font-weight: 700;
    margin-bottom: 0.75rem;
}

/* Scrollbar styling for modal content */
.ficha-content::-webkit-scrollbar {
    width: 8px;
}
.ficha-content::-webkit-scrollbar-track {
    background: transparent;
}
.ficha-content::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 20px;
}

/* Mobile Adjustments */
@media (max-width: 640px) {
    .ficha-content {
        padding: 1.5rem;
        max-width: 92%;
    }

    .ficha-title {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .ficha-table th, 
    .ficha-table td {
        display: block;
        width: 100%;
        padding: 0.25rem 0;
    }

    .ficha-table th {
        font-size: 0.85rem;
        color: #9ca3af;
        margin-top: 1rem;
        padding-bottom: 0.2rem;
    }

    .ficha-table td {
        font-size: 1rem;
        padding-top: 0;
    }
    
    .ficha-table tr {
        border-bottom: 1px solid #f3f4f6;
        display: block;
        padding-bottom: 1rem;
    }
}`;

fs.writeFileSync(path, content, 'utf8');
console.log('CSS updated');
