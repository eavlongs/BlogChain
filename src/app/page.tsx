import Home from "./HomePage";
import getBlogs from "./actions/get-blogs";

export default async function Page() {
    const blogs = await getBlogs();
    return <Home blogs={blogs} />;
}
