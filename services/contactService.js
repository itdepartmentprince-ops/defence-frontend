import { apiRequest } from "./api";

export const createContact = async (contactData) => {
    return apiRequest(
        "/contact",
        {
            method: "POST",
            body: JSON.stringify(contactData),
        },
        "Failed to submit enquiry"
    );
};