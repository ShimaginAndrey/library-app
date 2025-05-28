"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

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
    borrowingEligibility: { isEligible, message },
}: BorrowBookProps) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrowBook = async () => {
        if (!isEligible) {
            toast("Error", { description: message, dismissible: true });
        }

        setBorrowing(true);

        try {
            const result = await borrowBook({ bookId, userId });

            if (result.success) {
                toast("Success", { description: "Book borrowed successfully" });

                router.push("/");
            } else {
                toast("Error", {
                    description: result.error,
                    dismissible: true,
                });
            }
        } catch (error) {
            toast("Error", {
                description: "An error occurred while borrowing the book",
                dismissible: true,
            });
        } finally {
            setBorrowing(false);
        }
    };

    return (
        <Button
            className="book-overview_btn"
            disabled={borrowing}
            onClick={handleBorrowBook}
        >
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">
                {borrowing ? "Borrowing ..." : "Borrow Book"}
            </p>
        </Button>
    );
};

export default BorrowBook;
