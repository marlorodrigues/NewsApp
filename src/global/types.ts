export interface FileImage {
    destination: string
    filename: string
    originalname: string
    path: string
    mimetype: string
}

export interface ValidListing {
    page: number | null
    limit: number | null
    order: string | null
    direction: string | null
    where: any | null
    status: string | null
    start_date: string | null
    end_date: string | null
}

export interface Listing {
    page: number
    limit: number
    order: string
    direction: string
    where: any
    status: string
    start_date: string
    end_date: string
}