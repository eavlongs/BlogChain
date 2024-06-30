import { NextRequest } from "next/server";
import fs from "fs";

export async function GET(request: NextRequest) {
    try {
        const filename = request.nextUrl.searchParams.get("filename");
        if (!filename) {
            return new Response("Filename is required", {
                status: 400,
            });
        }

        const savePath = process.env.FILE_STORAGE_PATH;
        if (!savePath) throw Error("No env defined for FILE_STORAGE_PATH");
        const fileAbsPath = `${savePath}/${filename}`;
        console.log(fileAbsPath);
        if (!fs.existsSync(fileAbsPath)) {
            return new Response("File not found!", {
                status: 404,
            });
        }

        const file = await fs.promises.readFile(fileAbsPath);

        return new Response(file, {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to read file", {
            status: 500,
        });
    }
}
