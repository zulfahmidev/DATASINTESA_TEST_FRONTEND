"use client"

import { upload } from "@/service/graph";
import { ChangeEvent, useState } from "react"
import Swal from "sweetalert2";

export default function UploadPage() {
    const [file, setFile] = useState<File>()

    function updateFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    async function uploadFile() {
        if (!file) {
            Swal.fire({
                title: "No file selected!",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        const response = await upload(file)
        
        if (response.status < 300) {
            Swal.fire({
                title: "Uploaded Successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
        } else {
            Swal.fire({
                title: "Failed to upload!",
                text: response.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }

    return (
        <div className="w-96 mx-auto">
            <div className="bg-white p-5 rounded-lg order border-slate-200">
                <h2 className="text-slate-700 text-lg font-semibold">Upload</h2>
                <div className="mt-3">
                    <input 
                        type="file" 
                        className=" p-3 border border-slate-200 rounded-lg"
                        onChange={updateFile}
                    />
                </div>
                <div className="mt-3">
                    <button
                        type="submit"
                        className="py-2 px-3 rounded-lg bg-blue-500 text-white cursor-pointer"
                        onClick={uploadFile}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}