import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const Home = async () => {
    const latestBooks = await db.select().from(users);

    return (
        <>
            <BookOverview {...sampleBooks[0]} userId={""} />
            <BookList
                title="Latest Books"
                containerClassName="mt-28"
                books={sampleBooks}
            />
        </>
    );
};

export default Home;
