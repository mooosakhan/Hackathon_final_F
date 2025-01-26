"use client";
import { ReceiptWithQR } from "@/components/receipt-with-qr";

export default function Print() {
    return (
        <div className="flex justify-center items-center h-screen">
            <ReceiptWithQR />
        </div>
    )
}