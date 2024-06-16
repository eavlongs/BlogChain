"use server";

import { getBlogById } from "@/app/actions/get-blog-by-id";
import ClientBlogEdit from "./ClientBlogEdit";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: { blog_id: string };
}) {
    const blog = await getBlogById(parseInt(params.blog_id));

    if (blog === null) {
        redirect("/");
    }
    return <ClientBlogEdit blog={blog} />;
}
