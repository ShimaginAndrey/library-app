"use client";

import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import { cn } from "@/lib/utils";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface BookCoverProps {
    coverColor: string;
    coverImage?: string;
    className?: string;
    variant?: BookCoverVariant;
}

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: "book-cover_extra_small",
    small: "book-cover_small",
    medium: "book-cover_medium",
    regular: "book-cover_regular",
    wide: "book-cover_wide",
};

const BookCover = ({
    className,
    variant = "regular",
    coverColor = "#012B48",
    coverImage = "https://placehold.co/400x600.png",
}: BookCoverProps) => {
    return (
        <div
            className={cn(
                "relative transition-all duration-300",
                variantStyles[variant],
                className
            )}
        >
            <BookCoverSvg coverColor={coverColor} />

            <div
                className="absolute z-10"
                style={{ left: "12%", width: "87.5%", height: "88%" }}
            >
                <IKImage
                    path={coverImage}
                    urlEndpoint={config.env.imagekit.urlEndpoint}
                    alt="Book cover"
                    fill
                    className="rounded-sm object-fill"
                    loading="lazy"
                    lqip={{ active: true }}
                />
            </div>
        </div>
    );
};

export default BookCover;
