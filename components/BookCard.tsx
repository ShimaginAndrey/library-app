import Link from "next/link";
import { cn } from "@/lib/utils";
import BookCover from "./BookCover";
import Image from "next/image";
import { Button } from "./ui/button";

type BookCardProps = {
    isLoadingBook?: boolean;
} & Book;

const BookCard = ({
    id,
    title,
    genre,
    coverColor,
    coverUrl,
    isLoadingBook = false,
}: BookCardProps) => {
    return (
        <li className={cn(isLoadingBook && "xs:w-52 w-full")}>
            <Link
                href={`/books/${id}`}
                className={cn(
                    isLoadingBook && "w-full flex flex-col items-center"
                )}
            >
                <BookCover coverColor={coverColor} coverImage={coverUrl} />

                <div
                    className={cn(
                        "mt-4",
                        !isLoadingBook && "xs:max-w-40 max-w-28"
                    )}
                >
                    <p className="book-title">{title}</p>
                    <p className="book-genre">{genre}</p>
                </div>

                {isLoadingBook && (
                    <div className="mt-3 w-full">
                        <div className="book-loaned">
                            <Image
                                className="object-contain"
                                src="/icons/calendar.svg"
                                alt="calendar"
                                width={18}
                                height={18}
                            />
                            <p className="text-light-100">
                                11 days left to return
                            </p>
                        </div>

                        <Button className="book-btn">Download receipt</Button>
                    </div>
                )}
            </Link>
        </li>
    );
};

export default BookCard;
