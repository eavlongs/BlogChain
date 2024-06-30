"use server";
import fs from "fs";
import path from "path";

export async function createFile(formData: FormData) {
    const files = formData.getAll("image") as File[];
    let saveFiles: string[] = [];
    let savePath = process.env.FILE_STORAGE_PATH;
    if (!savePath) throw Error("No env defined for FILE_STORAGE_PATH");
    for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());

        // create the directory if it doesn't exist
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath, { recursive: true });
        }

        // separate the file name and extension
        const fileExtension = path.extname(file.name);
        const tempFilename = path.basename(file.name, fileExtension);
        const filename = `${tempFilename}-${crypto.randomUUID()}${fileExtension}`;
        const savePathAndFileName = path.join(savePath, filename);

        await fs.promises.writeFile(savePathAndFileName, buffer);

        console.log(`File saved: ${savePathAndFileName}`); // Logging statement

        saveFiles.push(filename);
    }
    return saveFiles; // Return the full paths of the saved files
}
