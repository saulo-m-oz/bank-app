import { clientGetAPIClient, getAPIClient } from "./axios";

export const api = getAPIClient();
export const clientAPI = clientGetAPIClient();