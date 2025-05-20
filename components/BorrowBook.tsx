"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface BorrowBookProps {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}

const BorrowBook = ({
    userId,
    bookId,
    // borrowingEligibility: { isEligible, message },
}) => {
    const [borrowing, setBorrowing] = useState(false);
    return (
        <Button
            className="book-overview_btn"
            disabled={borrowing}
            // onClick={handleBorrowBook}
        >
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">
                {borrowing ? "Borrowing ..." : "Borrow Book"}
            </p>
        </Button>
    );
};

export default BorrowBook;
