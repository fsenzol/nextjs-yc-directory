import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {
    const query = (await searchParams).query

    const posts = [
        {
            _createdAt: new Date(),
            views: 55,
            id: 1122,
            author: {
                _id: 1,
                name: 'Faith'
            },
            description: "This is a description",
            image: "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Robots",
            title: 'We Robots'
        }
    ]

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch Your Startup, <br/> Connect with entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit ideas, Vote on Pitches, and get noticed in virtual competitions
                </p>
                <SearchForm query={query}/>
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for ${query}` : `All Startups`}
                </p>
                <ul className="mt-7 card_grid">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <StartupCard post={post} key={post?.id}/>
                        ))
                    ) : (
                        <p className="no-result">No startups found</p>
                    )}
                </ul>
            </section>


        </>
    );
}
