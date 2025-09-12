"use server"

import { Fetch } from "../http/fetch";
import { APIResponse } from "../http/rest";

export async function getGraph(
    startDate: string, 
    endDate: string,
    enodebId: string,
    cellId: string
) : Promise<APIResponse> {

    const response = await Fetch(`/graph`, {
        startDate: startDate, 
        endDate: endDate,
        enodebId: String(enodebId),
        cellId: String(cellId)
    })

    return response
}

export async function upload(file: File) : Promise<APIResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await Fetch(`/upload`, {}, {
        method: 'POST',
        body: formData
    })

    return response
}