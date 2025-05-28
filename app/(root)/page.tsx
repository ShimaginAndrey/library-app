import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
    const session = await auth();

    const latestBooks = await db
        .select()
        .from(books)
        .limit(10)
        .orderBy(desc(books.createdAt));

    return (
        <>
            <BookOverview
                {...latestBooks[0]}
                userId={session?.user?.id as string}
            />
            <BookList
                title="Latest Books"
                containerClassName="mt-28"
                books={latestBooks.slice(1)}
            />
        </>
    );
};

export default Home;
