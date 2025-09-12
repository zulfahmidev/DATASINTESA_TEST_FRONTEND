"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function FilterForm() {
    const router = useRouter()
    const params = useSearchParams()

    function formatDateTime(input: string) {
        const date = new Date(input);

        const Y = date.getFullYear();
        const M = String(date.getMonth() + 1).padStart(2, "0");
        const D = String(date.getDate()).padStart(2, "0");
        const H = String(date.getHours()).padStart(2, "0");
        const i = String(date.getMinutes()).padStart(2, "0");
        const s = String(date.getSeconds()).padStart(2, "0");

        return `${Y}-${M}-${D} ${H}:${i}:${s}`;
    }

    function toInputDateTime(value: string | null) {
        if (!value) return "";
        const date = new Date(value);
        const Y = date.getFullYear();
        const M = String(date.getMonth() + 1).padStart(2, "0");
        const D = String(date.getDate()).padStart(2, "0");
        const H = String(date.getHours()).padStart(2, "0");
        const i = String(date.getMinutes()).padStart(2, "0");

        return `${Y}-${M}-${D}T${H}:${i}`; // format yang valid untuk datetime-local
    }

    function updateFilter(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const startDate = form.get("startDate")?.toString() || "";
        const endDate = form.get("endDate")?.toString() || "";
        console.log(form.get("startDate"))

        const params = new URLSearchParams({
            startDate: startDate ? formatDateTime(startDate) : "",
            endDate: endDate ? formatDateTime(endDate) : "",
            enodebId: form.get("enodebId")?.toString() || "",
            cellId: form.get("cellId")?.toString() || "",
        });

        router.push(`/?${params.toString()}`)
    }

    return (
        <form onSubmit={updateFilter}>
            <div className="mt-3">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    defaultValue={toInputDateTime(params.get("startDate"))}
                    className="py-2 px-3 rounded-lg border border-slate-200 w-full"
                />
            </div>

            <div className="mt-3">
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    defaultValue={toInputDateTime(params.get("endDate"))}
                    className="py-2 px-3 rounded-lg border border-slate-200 w-full"
                />
            </div>

            <div className="mt-3">
                <label htmlFor="enodebId">Enodeb ID:</label>
                <input
                    type="number"
                    id="enodebId"
                    name="enodebId"
                    placeholder="000000"
                    defaultValue={params.get("enodebId") || ""}
                    className="py-2 px-3 rounded-lg border border-slate-200 w-full"
                />
            </div>

            <div className="mt-3">
                <label htmlFor="cellId">Cell ID:</label>
                <input
                    type="number"
                    id="cellId"
                    name="cellId"
                    placeholder="00"
                    defaultValue={params.get("cellId") || ""}
                    className="py-2 px-3 rounded-lg border border-slate-200 w-full"
                />
            </div>

            <div className="mt-3">
                <button
                    type="submit"
                    className="py-2 px-3 rounded-lg bg-blue-500 text-white cursor-pointer"
                >
                    Update
                </button>
            </div>
        </form>
    );
}
